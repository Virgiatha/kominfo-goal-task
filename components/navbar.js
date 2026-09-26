"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("goaltrack-user");
    sessionStorage.removeItem("goaltrack-token");
    localStorage.removeItem("goaltrack-token");
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="border-b border-[#0B5D3B] bg-[#0B5D3B] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <Image
            src="/logo kalsel.svg"
            alt="Logo Pemerintah Provinsi Kalimantan Selatan"
            width={36}
            height={48}
            className="h-12 w-9 object-contain"
          />
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase leading-4 tracking-wide text-white/75">
              Pemerintah Provinsi
            </span>
            <span className="block truncate text-sm font-bold leading-5 sm:text-base">
              Kalimantan Selatan
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={user ? "/dashboard" : "/login"}
            className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline-block"
          >
            Dashboard
          </Link>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <span className="max-w-[8rem] truncate">{user.username}</span>
                <span aria-hidden="true" className="text-xs text-white/70">
                  ▼
                </span>
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.username}
                    </p>
                    {user.role ? (
                      <p className="mt-0.5 text-xs text-slate-500">{user.role}</p>
                    ) : null}
                  </div>
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#EAF5EF] hover:text-[#0B5D3B]"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2.5 text-left text-sm text-red-700 hover:bg-red-50"
                  >
                    Keluar
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-[#167A52] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0B5D3B]"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
