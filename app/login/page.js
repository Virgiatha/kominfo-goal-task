"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/button";
import { api } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = form.username.trim();
    const password = form.password;

    if (!username || !password) {
      setError("Nama pengguna dan kata sandi wajib diisi.");
      return;
    }

    if (password.length < 8) {
      setError("Password harus memiliki minimal 8 karakter.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/login", { username, password });

      const user = response?.data ?? response;
      const safeUser = {
        id: user?.id ?? 1,
        username: user?.username || username,
        role: user?.role,
      };

      sessionStorage.setItem("goaltrack-user", JSON.stringify(safeUser));
      const token =
        user?.token ??
        user?.access_token ??
        response?.token ??
        response?.access_token;
      if (token) sessionStorage.setItem("goaltrack-token", token);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Username atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-[#F5F7FA] px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <Image
            src="/logo kalsel.svg"
            alt="Logo Pemerintah Provinsi Kalimantan Selatan"
            width={64}
            height={96}
            className="mx-auto h-24 w-16 object-contain"
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#0B5D3B]">
            Pemerintah Provinsi
          </p>
          <p className="text-sm font-bold text-[#0B5D3B]">Kalimantan Selatan</p>
          <h1 className="mt-4 text-xl font-semibold text-slate-900 sm:text-2xl">
            Aplikasi Pencatat Goals
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Masuk untuk mengakses dashboard
          </p>
        </div>

        {error ? (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username / Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
              placeholder="Masukkan nama pengguna"
              autoComplete="username"
              required
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#167A52] focus:bg-white focus:ring-4 focus:ring-[#167A52]/15"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Masukkan kata sandi"
              autoComplete="current-password"
              required
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#167A52] focus:bg-white focus:ring-4 focus:ring-[#167A52]/15"
            />
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Masuk
          </Button>
        </form>
      </section>
    </main>
  );
}
