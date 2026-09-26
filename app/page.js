"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("goaltrack-user")));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16">
      <section className="relative mx-auto max-w-6xl">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Image
              src="/logo kalsel.svg"
              alt="Logo Pemerintah Provinsi Kalimantan Selatan"
              width={64}
              height={96}
              className="h-20 w-14 object-contain sm:h-24 sm:w-16"
            />
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0B5D3B]">
                Pemerintah Provinsi Kalimantan Selatan
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Aplikasi Pencatat Goals
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Kelola Goal dan Task secara terarah. Pantau progress pekerjaan
                dalam satu dashboard yang sederhana dan formal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#167A52] px-6 font-semibold text-white transition hover:bg-[#0B5D3B]"
                >
                  {isLoggedIn ? "Buka Dashboard" : "Masuk"}
                </Link>
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-[#167A52] hover:text-[#0B5D3B]"
                  >
                    Ke Halaman Login
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [
              "Kelola Goal",
              "Buat Goal dan uraikan menjadi Task yang dapat dipantau.",
            ],
            [
              "Pantau Progress",
              "Progress Goal dihitung otomatis berdasarkan Task yang selesai.",
            ],
            [
              "Tertib dan Terarah",
              "Setiap pekerjaan memiliki target dan status yang jelas.",
            ],
          ].map(([title, description]) => (
            <article key={title} className="goal-card p-6">
              <div className="mb-3 h-1 w-10 rounded-full bg-[#D4A72C]" />
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
