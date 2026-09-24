import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-slate-600 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/logo kalsel.svg" alt="Logo Pemerintah Provinsi Kalimantan Selatan" width={24} height={32} className="h-8 w-6 object-contain" />
          <p>© {new Date().getFullYear()} Pemerintah Provinsi Kalimantan Selatan</p>
        </div>
        <p className="text-slate-500">Aplikasi Sasaran Kerja dan Rencana Kerja</p>
      </div>
    </footer>
  );
}
