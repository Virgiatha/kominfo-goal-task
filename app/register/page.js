import Link from "next/link";
import Image from "next/image";
import Button from "../../components/button";

export const metadata = {
    title: "Daftar Akun",
};


export default function RegisterPage() {
    return (
        <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-[#f4f6f8] px-4 py-12 sm:px-6">
            <section className="grid w-full max-w-5xl overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
                <div className="hidden flex-col justify-between bg-[#123B5D] p-10 text-white lg:flex xl:p-14">
                    <div>
                        <Image src="/logo kalsel.svg" alt="Logo Pemerintah Provinsi Kalimantan Selatan" width={64} height={96} className="h-24 w-16 object-contain" />
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-200">Pemerintah Provinsi Kalimantan Selatan</p>
                        <p className="mt-2 text-sm font-medium text-white">Aplikasi Sasaran Kerja</p>
                        <h2 className="mt-16 max-w-sm text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                                Kelola kinerja dengan lebih terarah.
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-6 text-white/65">
                            Gunakan akun Anda untuk mengakses layanan pemantauan kinerja.
                    </p>
                </div>

                <div className="p-7 sm:p-10 lg:p-14">
                    <div className="mb-9">
                        <p className="mb-3 text-sm font-semibold text-[#1E5A82]">
                                Pendaftaran Pengguna
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-[#123B5D] sm:text-4xl">
                                Buat akun pengguna baru
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                Lengkapi data berikut untuk membuat akun pada sistem.
                        </p>
                    </div>

                    <form className="space-y-5">

                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-[#1F2937]"
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
                                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-[#1F2937] outline-none transition placeholder:text-slate-400 focus:border-[#1E5A82] focus:bg-white focus:ring-4 focus:ring-[#1E5A82]/10"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[#1F2937]"
                                >
                                        Kata sandi
                                </label>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Masukkan password"
                                autoComplete="current-password"
                                required
                                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-[#1F2937] outline-none transition placeholder:text-slate-400 focus:border-[#1E5A82] focus:bg-white focus:ring-4 focus:ring-[#1E5A82]/10"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                                Daftar sekarang
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#123B5D] underline decoration-[#D4A72C] decoration-2 underline-offset-4"
                        >
                                Masuk sekarang
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
