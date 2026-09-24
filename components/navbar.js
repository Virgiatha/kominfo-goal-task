"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedUser = sessionStorage.getItem("goaltrack-user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("goaltrack-user");
    sessionStorage.removeItem("goaltrack-token");
    localStorage.removeItem("goaltrack-token");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-[#123B5D]">
          <Image src="/logo kalsel.svg" alt="Logo Pemerintah Provinsi Kalimantan Selatan" width={36} height={48} className="h-12 w-9 object-contain" />
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase leading-4 tracking-wide text-slate-500">Pemerintah Provinsi</span>
            <span className="block truncate text-sm font-bold leading-5 sm:text-base">Kalimantan Selatan</span>
            <span className="block text-xs text-slate-500">Aplikasi Sasaran Kerja</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href={user ? "/dashboard" : "/login"} className="hidden text-sm font-medium text-[#123B5D] transition-colors hover:text-[#1E5A82] sm:inline-block">
            Dashboard
          </Link>

          {user ? (
            <>
              <span className="hidden border-l border-slate-300 pl-3 text-sm font-medium text-slate-700 sm:inline-flex">
                {user.username}
              </span>
              <Button variant="secondary" className="!min-h-10 !px-4 !py-2 text-xs sm:text-sm" onClick={handleLogout}>
                Keluar
              </Button>
            </>
          ) : (
            <Link href="/login" className="inline-flex items-center justify-center rounded-md bg-[#1E5A82] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#123B5D]">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}