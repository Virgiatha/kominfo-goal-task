"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/button";
import { api } from "../../lib/api";
import { exportGoalsPdf } from "./pdf";

// const DASHBOARD_REFRESH_INTERVAL = 5000;

function normalizeGoal(goal) {
  if (!goal) return null;

  const tasks = Array.isArray(goal.tasks) ? goal.tasks : [];
  const completedTasks =
    goal.completed_tasks ??
    tasks.filter(
      (task) => task.is_completed || task.completed || task.status === "completed"
    ).length;
  const totalTasks = goal.total_tasks ?? tasks.length;
  const progress =
    typeof goal.progress === "number"
      ? goal.progress
      : totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

  return {
    id: goal.id ?? goal.goal_id,
    title: goal.title ?? "Goal tanpa judul",
    description: goal.description ?? "",
    quarter_id: goal.quarter_id ?? goal.quarterId ?? null,
    total_tasks: totalTasks,
    completed_tasks: completedTasks,
    progress,
    tasks,
  };
}

function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(sessionStorage.getItem("goaltrack-user"));
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isQuarterOpen, setIsQuarterOpen] = useState(false);
  const [selectedQuarterId, setSelectedQuarterId] = useState("all");
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    quarter_id: "",
  });
  const [newQuarter, setNewQuarter] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });
  const [goalSubmitLoading, setGoalSubmitLoading] = useState(false);
  const [quarterSubmitLoading, setQuarterSubmitLoading] = useState(false);
  const [taskDraft, setTaskDraft] = useState("");
  const [taskLoadingId, setTaskLoadingId] = useState(null);
  const [goalDetailLoading, setGoalDetailLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const clearAuthentication = () => {
    sessionStorage.removeItem("goaltrack-user");
    sessionStorage.removeItem("goaltrack-token");
    localStorage.removeItem("goaltrack-token");
    router.replace("/login");
  };

  const showSuccess = (message) => {
    setSuccess(message);
    window.setTimeout(() => setSuccess(""), 3500);
  };

  const fetchGoals = async () => {
    try {
      const response = await api.get("/api/goals");
      const result = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];
      setGoals(result.map(normalizeGoal).filter(Boolean));
      setError("");
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Gagal memuat Goals.");
    }
  };

  const fetchQuarters = async () => {
    try {
      const response = await api.get("/api/quarters");
      const result = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];
      setQuarters(result);
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Gagal memuat periode.");
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = useEffectEvent(() => {
    fetchGoals();
    fetchQuarters();
  });

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      sessionStorage.removeItem("goaltrack-user");
      sessionStorage.removeItem("goaltrack-token");
      localStorage.removeItem("goaltrack-token");
      router.replace("/login");
      return;
    }

    const initialLoadTimer = window.setTimeout(() => {
      setUser(storedUser);
      loadDashboardData();
    }, 0);

    const refreshTimer = window.setInterval(() => {
      loadDashboardData();
    }, DASHBOARD_REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(initialLoadTimer);
      window.clearInterval(refreshTimer);
    };
  }, [router]);

  const filteredGoals = useMemo(() => {
    if (selectedQuarterId === "all") return goals;
    return goals.filter(
      (goal) => String(goal.quarter_id ?? "") === String(selectedQuarterId)
    );
  }, [goals, selectedQuarterId]);

  const summary = useMemo(() => {
    const totalGoals = filteredGoals.length;
    const completedGoals = filteredGoals.filter(
      (goal) => goal.progress >= 100
    ).length;
    const tasksCompleted = filteredGoals.reduce(
      (sum, goal) => sum + (goal.completed_tasks || 0),
      0
    );
    const totalTasks = filteredGoals.reduce(
      (sum, goal) => sum + (goal.total_tasks || 0),
      0
    );

    return {
      totalGoals,
      completedGoals,
      tasksCompleted,
      totalTasks,
      overallProgress: totalTasks
        ? Math.round((tasksCompleted / totalTasks) * 100)
        : 0,
    };
  }, [filteredGoals]);

  const activeGoals = useMemo(
    () => filteredGoals.filter((goal) => goal.progress < 100),
    [filteredGoals]
  );

  const pendingTasks = useMemo(
    () =>
      filteredGoals.flatMap((goal) =>
        (Array.isArray(goal.tasks) ? goal.tasks : [])
          .filter(
            (task) =>
              !(
                task.is_completed ||
                task.completed ||
                task.status === "completed"
              )
          )
          .map((task) => ({ ...task, goalTitle: goal.title }))
      ),
    [filteredGoals]
  );

  const refreshGoals = async () => {
    await fetchGoals();
  };

  const refreshQuarters = async () => {
    await fetchQuarters();
  };

  const createGoal = async (event) => {
    event.preventDefault();
    const title = newGoal.title.trim();

    if (!title) {
      setError("Nama Goal wajib diisi.");
      return;
    }

    if (!quarters.length) {
      setError("Buat periode terlebih dahulu sebelum membuat Goal.");
      return;
    }

    setGoalSubmitLoading(true);
    setError("");

    try {
      const payload = {
        title,
        description: newGoal.description.trim(),
        quarter_id: newGoal.quarter_id
          ? Number(newGoal.quarter_id)
          : selectedQuarterId !== "all"
            ? Number(selectedQuarterId)
            : null,
      };

      await api.post("/api/goals", payload);
      setNewGoal({ title: "", description: "", quarter_id: "" });
      setIsCreateOpen(false);
      showSuccess("Goal berhasil ditambahkan.");
      await refreshGoals();
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Goal tidak dapat dibuat.");
    } finally {
      setGoalSubmitLoading(false);
    }
  };

  const createQuarter = async (event) => {
    event.preventDefault();
    const name = newQuarter.name.trim();

    if (!name) {
      setError("Nama periode wajib diisi.");
      return;
    }

    setQuarterSubmitLoading(true);
    setError("");

    try {
      await api.post("/api/quarters", {
        name,
        start_date: newQuarter.start_date || null,
        end_date: newQuarter.end_date || null,
      });

      setNewQuarter({ name: "", start_date: "", end_date: "" });
      setIsQuarterOpen(false);
      showSuccess("Periode berhasil ditambahkan.");
      await refreshQuarters();
      await refreshGoals();
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Periode tidak dapat dibuat.");
    } finally {
      setQuarterSubmitLoading(false);
    }
  };

  const addTask = async (goalId) => {
    const title = taskDraft.trim();
    if (!title) return;

    setTaskLoadingId(goalId);
    setError("");

    try {
      await api.post(`/api/goals/${goalId}/tasks`, { title });
      setTaskDraft("");
      showSuccess("Task berhasil ditambahkan.");
      const response = await api.get(`/api/goals/${goalId}`);
      setSelectedGoal(normalizeGoal(response));
      await refreshGoals();
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Task tidak dapat ditambahkan.");
    } finally {
      setTaskLoadingId(null);
    }
  };

  const updateTask = async (taskId, currentStatus) => {
    setTaskLoadingId(taskId);
    setError("");

    try {
      await api.patch(
        `/api/tasks/${taskId}/${currentStatus ? "incomplete" : "complete"}`
      );
      showSuccess("Task berhasil diperbarui.");
      if (selectedGoal?.id) {
        const response = await api.get(`/api/goals/${selectedGoal.id}`);
        setSelectedGoal(normalizeGoal(response));
      }
      await refreshGoals();
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Task tidak dapat diperbarui.");
    } finally {
      setTaskLoadingId(null);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus Task ini?")) return;

    setTaskLoadingId(taskId);
    setError("");

    try {
      await api.del(`/api/tasks/${taskId}`);
      showSuccess("Task berhasil dihapus.");
      if (selectedGoal?.id) {
        const response = await api.get(`/api/goals/${selectedGoal.id}`);
        setSelectedGoal(normalizeGoal(response));
      }
      await refreshGoals();
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Task tidak dapat dihapus.");
    } finally {
      setTaskLoadingId(null);
    }
  };

  const openGoalDetails = async (goal) => {
    setGoalDetailLoading(true);
    setError("");

    try {
      const response = await api.get(`/api/goals/${goal.id}`);
      setSelectedGoal(normalizeGoal(response));
    } catch (err) {
      if (err.status === 401) {
        clearAuthentication();
        return;
      }
      setError(err.message || "Goal tidak dapat dimuat.");
    } finally {
      setGoalDetailLoading(false);
    }
  };

  const downloadGoalsPdf = async (mode = "all") => {
    try {
      setPdfLoading(true);
      const selectedQuarter = quarters.find(
        (quarter) => String(quarter.id) === String(selectedQuarterId)
      );
      const reportGoals = mode === "all" ? goals : filteredGoals;
      const period =
        mode === "all"
          ? "Semua Periode"
          : selectedQuarter?.name || "Periode Terpilih";
      const reportTitle =
        mode === "all"
          ? "Laporan Seluruh Goal dan Task"
          : "Laporan Goal dan Task Periode";
      await exportGoalsPdf(reportGoals, { title: reportTitle, period });
    } catch (err) {
      setError(err.message || "Laporan PDF tidak dapat dibuat.");
    } finally {
      setPdfLoading(false);
    }
  };

  const navItems = [
    { id: "dashboard", href: "#dashboard", label: "Dashboard" },
    { id: "goals", href: "#goals", label: "Goals" },
    { id: "tasks", href: "#tasks", label: "Tasks" },
  ];

  if (!user) return null;

  return (
    <div className="goal-shell">
      <div className="dashboard-frame">
        <aside className="goal-card h-fit overflow-hidden">
          <div className="border-b border-slate-200 bg-[#EAF5EF] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0B5D3B]">
              Menu Utama
            </p>
          </div>
          <nav
            aria-label="Navigasi dashboard"
            className="flex gap-1 overflow-x-auto p-2 lg:block"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`block whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#167A52] text-white"
                      : "text-slate-700 hover:bg-[#EAF5EF] hover:text-[#0B5D3B]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>

        <main id="dashboard" className="min-w-0">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#167A52]">Dashboard</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Selamat datang, {user.username || "Pengguna"}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Pantau Goal dan progress Task Anda.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => downloadGoalsPdf("quarter")}
                loading={pdfLoading}
                className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm"
              >
                Unduh Periode
              </Button>
              <Button
                variant="secondary"
                onClick={() => downloadGoalsPdf("all")}
                loading={pdfLoading}
                className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm"
              >
                Unduh Semua
              </Button>
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="!min-h-11"
              >
                + Tambah Goal
              </Button>
            </div>
          </div>

          {error ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">Terjadi Kesalahan</p>
              <p className="mt-1">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setLoading(true);
                  fetchGoals();
                  fetchQuarters();
                }}
                className="mt-2 text-sm font-semibold text-red-800 underline"
              >
                Coba Lagi
              </button>
            </div>
          ) : null}
          {success ? (
            <div
              role="status"
              className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              ✓ {success}
            </div>
          ) : null}

          {loading ? (
            <div className="goal-card p-8 text-sm text-slate-600">
              Memuat Goals...
            </div>
          ) : (
            <>
              <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Periode
                    </h2>
                    {/* <p className="mt-1 text-xs text-slate-500">
                      Data diperbarui otomatis setiap 5 detik
                    </p> */}
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsQuarterOpen(true)}
                    className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm"
                  >
                    + Tambah Periode
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedQuarterId("all")}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      selectedQuarterId === "all"
                        ? "border-[#167A52] bg-[#167A52] text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-[#EAF5EF]"
                    }`}
                  >
                    Semua
                  </button>
                  {quarters.length === 0 ? (
                    <span className="text-sm text-slate-500">
                      Belum ada periode.
                    </span>
                  ) : (
                    quarters.map((quarter) => (
                      <button
                        key={quarter.id}
                        type="button"
                        onClick={() =>
                          setSelectedQuarterId(String(quarter.id))
                        }
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          String(selectedQuarterId) === String(quarter.id)
                            ? "border-[#167A52] bg-[#167A52] text-white"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-[#EAF5EF]"
                        }`}
                      >
                        {quarter.name}
                      </button>
                    ))
                  )}
                </div>
              </section>

              <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Total Goals", summary.totalGoals],
                  ["Active Goals", activeGoals.length],
                  ["Completed Goals", summary.completedGoals],
                  ["Total Tasks", summary.totalTasks],
                ].map(([label, value]) => (
                  <article key={label} className="goal-card p-5">
                    <p className="text-sm font-medium text-slate-500">
                      {label}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#0B5D3B]">
                      {value}
                    </h2>
                  </article>
                ))}
              </section>

              <section id="goals" className="goal-card p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Goal Aktif
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Daftar Goal yang sedang berjalan
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setIsCreateOpen(true)}
                    className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm"
                  >
                    + Tambah Goal
                  </Button>
                </div>

                {filteredGoals.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Belum Ada Goal
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Anda belum memiliki Goal.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button onClick={() => setIsCreateOpen(true)}>
                        + Tambah Goal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredGoals.map((goal) => (
                      <article
                        key={goal.id}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-slate-900">
                            {goal.title}
                          </h3>
                          <span
                            className={`status-chip shrink-0 ${
                              goal.progress >= 100 ? "complete" : "pending"
                            }`}
                          >
                            {goal.progress >= 100 ? "Selesai" : "Berjalan"}
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                          {goal.description || "Belum ada deskripsi"}
                        </p>

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="goal-progress-bar">
                            <span
                              className="goal-progress-fill"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-slate-500">
                            {goal.completed_tasks || 0} dari{" "}
                            {goal.total_tasks || 0} Task selesai
                          </p>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            onClick={() => openGoalDetails(goal)}
                            loading={goalDetailLoading}
                            variant="secondary"
                            className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm"
                          >
                            Lihat Detail
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              <section id="tasks" className="mt-6 goal-card p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Task Belum Selesai
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Beberapa Task yang masih perlu dikerjakan
                    </p>
                  </div>
                  <span className="status-chip pending">
                    {pendingTasks.length} Task
                  </span>
                </div>
                {pendingTasks.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Tidak ada Task yang tertunda.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
                    {pendingTasks.slice(0, 6).map((task) => (
                      <div
                        key={`${task.goal_id ?? task.goalId ?? task.id}-${task.id}`}
                        className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="flex items-center gap-2 font-medium text-slate-800">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-4 w-4 items-center justify-center rounded border border-slate-300 text-[10px] text-slate-400"
                          >
                            ○
                          </span>
                          {task.title}
                        </span>
                        <span className="text-sm text-slate-500">
                          Goal: {task.goalTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {isCreateOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
              <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Tambah Goal
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="h-9 w-9 rounded-lg text-xl text-slate-500 hover:bg-slate-100"
                    aria-label="Tutup formulir Goal"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={createGoal} className="space-y-5">
                  <div>
                    <label
                      htmlFor="goal-title"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Nama Goal
                    </label>
                    <input
                      id="goal-title"
                      value={newGoal.title}
                      onChange={(event) =>
                        setNewGoal((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                      placeholder="Contoh: Belajar Bahasa Asing"
                      className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="goal-description"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Deskripsi
                    </label>
                    <textarea
                      id="goal-description"
                      value={newGoal.description}
                      onChange={(event) =>
                        setNewGoal((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      placeholder="Tuliskan deskripsi Goal"
                      rows={4}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="goal-quarter"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Periode
                    </label>
                    <select
                      id="goal-quarter"
                      value={
                        newGoal.quarter_id ||
                        (selectedQuarterId !== "all"
                          ? String(selectedQuarterId)
                          : "")
                      }
                      onChange={(event) =>
                        setNewGoal((current) => ({
                          ...current,
                          quarter_id: event.target.value,
                        }))
                      }
                      className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                    >
                      <option value="">Pilih periode</option>
                      {quarters.map((quarter) => (
                        <option key={quarter.id} value={String(quarter.id)}>
                          {quarter.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button type="submit" loading={goalSubmitLoading}>
                      Simpan
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}

          {isQuarterOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
              <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Tambah Periode
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsQuarterOpen(false)}
                    className="h-9 w-9 rounded-lg text-xl text-slate-500 hover:bg-slate-100"
                    aria-label="Tutup formulir periode"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={createQuarter} className="space-y-5">
                  <div>
                    <label
                      htmlFor="quarter-name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Nama periode
                    </label>
                    <input
                      id="quarter-name"
                      value={newQuarter.name}
                      onChange={(event) =>
                        setNewQuarter((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Contoh: Triwulan I 2026"
                      className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="quarter-start"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Tanggal mulai
                      </label>
                      <input
                        id="quarter-start"
                        type="date"
                        value={newQuarter.start_date}
                        onChange={(event) =>
                          setNewQuarter((current) => ({
                            ...current,
                            start_date: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quarter-end"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Tanggal selesai
                      </label>
                      <input
                        id="quarter-end"
                        type="date"
                        value={newQuarter.end_date}
                        onChange={(event) =>
                          setNewQuarter((current) => ({
                            ...current,
                            end_date: event.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsQuarterOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button type="submit" loading={quarterSubmitLoading}>
                      Simpan
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}

          {selectedGoal ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {selectedGoal.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {selectedGoal.description || "Belum ada deskripsi."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedGoal(null)}
                    className="h-9 w-9 rounded-lg text-xl text-slate-500 hover:bg-slate-100"
                    aria-label="Tutup detail Goal"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-6 rounded-xl border border-slate-200 bg-[#EAF5EF] p-4">
                  <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
                    <span>Progress</span>
                    <span>{selectedGoal.progress}%</span>
                  </div>
                  <div className="goal-progress-bar">
                    <span
                      className="goal-progress-fill"
                      style={{ width: `${selectedGoal.progress}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {selectedGoal.completed_tasks || 0} dari{" "}
                    {selectedGoal.total_tasks || 0} Task selesai
                  </p>
                </div>

                <h4 className="mb-4 text-lg font-semibold text-slate-900">
                  Tasks
                </h4>

                <div className="space-y-3">
                  {selectedGoal.tasks.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                      <p className="font-medium text-slate-700">
                        Belum Ada Task
                      </p>
                      <p className="mt-1">Goal ini belum memiliki Task.</p>
                    </div>
                  ) : (
                    selectedGoal.tasks.map((task) => {
                      const completed = Boolean(
                        task.is_completed ||
                          task.completed ||
                          task.status === "completed"
                      );
                      return (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                        >
                          <input
                            type="checkbox"
                            checked={completed}
                            disabled={taskLoadingId === task.id}
                            onChange={() => updateTask(task.id, completed)}
                            className="h-4 w-4 accent-[#167A52]"
                            aria-label={
                              completed
                                ? `Tandai belum selesai: ${task.title}`
                                : `Tandai selesai: ${task.title}`
                            }
                          />
                          <div className="min-w-0 flex-1">
                            <span
                              className={`block ${
                                completed
                                  ? "text-slate-400 line-through"
                                  : "text-slate-700"
                              }`}
                            >
                              {completed ? "✓ " : "○ "}
                              {task.title}
                            </span>
                            <span className="text-xs text-slate-500">
                              {completed ? "Selesai" : "Belum selesai"}
                            </span>
                          </div>
                          <button
                            type="button"
                            disabled={taskLoadingId === task.id}
                            onClick={() => deleteTask(task.id)}
                            className="text-sm font-semibold text-red-700 hover:text-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={taskDraft}
                    onChange={(event) => setTaskDraft(event.target.value)}
                    placeholder="Nama Task baru"
                    className="h-12 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#167A52] focus:ring-4 focus:ring-[#167A52]/15"
                  />
                  <Button
                    onClick={() => addTask(selectedGoal.id)}
                    loading={taskLoadingId === selectedGoal.id}
                    className="!min-h-12"
                  >
                    + Tambah Task
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
