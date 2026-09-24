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
      };

      sessionStorage.setItem("goaltrack-user", JSON.stringify(safeUser));
      const token = user?.token ?? user?.access_token ?? response?.token ?? response?.access_token;
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
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-[#f4f6f8] px-4 py-12 sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden flex-col justify-between bg-[#123B5D] p-10 text-white lg:flex xl:p-14">
          <div>
            <Image src="/logo kalsel.svg" alt="Logo Pemerintah Provinsi Kalimantan Selatan" width={64} height={96} className="h-24 w-16 object-contain" />
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-200">Pemerintah Provinsi Kalimantan Selatan</p>
            <p className="mt-2 text-sm font-medium text-white">Aplikasi Sasaran Kerja</p>
            <h2 className="mt-16 max-w-sm text-4xl font-semibold leading-tight xl:text-5xl">
              Selamat datang kembali
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-200">
            Masuk untuk melanjutkan pemantauan sasaran dan kinerja Anda.
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-14">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Masuk ke Sistem Kinerja</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Gunakan nama pengguna dan kata sandi untuk mengakses dashboard.</p>
          </div>

          {error ? (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">Nama pengguna</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                placeholder="Masukkan nama pengguna"
                autoComplete="username"
                required
                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1E5A82] focus:bg-white focus:ring-4 focus:ring-[#1E5A82]/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Kata sandi</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1E5A82] focus:bg-white focus:ring-4 focus:ring-[#1E5A82]/10"
              />
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Masuk
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
