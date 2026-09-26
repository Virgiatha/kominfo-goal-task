import Link from "next/link";
import Image from "next/image";
import Button from "../../components/button";

export const metadata = {
  title: "Daftar Akun",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-[#F5F7FA] px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <Image
            src="/logo kalsel.svg"
            alt="Logo Pemerintah Provinsi Kalimantan Selatan"
            width={64}
            height={96}
            className="mx-auto h-20 w-14 object-contain"
          />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#0B5D3B]">
            Pemerintah Provinsi Kalimantan Selatan
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            Daftar Akun
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Buat akun untuk mengakses Aplikasi Pencatat Goals
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nama pengguna
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Masukkan username"
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
              Kata sandi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              autoComplete="new-password"
              required
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#167A52] focus:bg-white focus:ring-4 focus:ring-[#167A52]/15"
            />
          </div>

          <Button type="submit" className="w-full">
            Daftar
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0B5D3B] underline decoration-[#D4A72C] decoration-2 underline-offset-4"
          >
            Masuk
          </Link>
        </p>
      </section>
    </main>
  );
}
