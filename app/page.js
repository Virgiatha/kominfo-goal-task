"use client";

import Link from "next/link";
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
    <main className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20">
      <section className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#176b3a]">SISTEM KINERJA</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Pemantauan Sasaran dan Kinerja</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Kelola periode, Sasaran Kerja, dan Rencana Kerja secara terarah dalam satu dashboard yang mudah digunakan.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={isLoggedIn ? "/dashboard" : "/login"} className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#176b3a] px-6 font-semibold text-white transition hover:bg-[#0e4d2a]">
              {isLoggedIn ? "Buka Dashboard" : "Masuk ke Sistem"}
            </Link>
            {!isLoggedIn && <Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-[#176b3a] hover:text-[#176b3a]">Masuk</Link>}
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            ["Kelola Sasaran Kerja", "Buat Sasaran Kerja dan uraikan menjadi Rencana Kerja yang terukur."],
            ["Pantau Capaian", "Lihat capaian dan Rencana Kerja yang telah diselesaikan."],
            ["Tertib dan Terarah", "Pastikan setiap pekerjaan memiliki target dan Periode Kinerja."],
          ].map(([title, description]) => (
            <article key={title} className="goal-card p-6">
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
