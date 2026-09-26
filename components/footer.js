import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-sm text-slate-600 sm:flex-row">
        <div className="flex items-start gap-3">
          <Image
            src="/logo kalsel.svg"
            alt="Logo Pemerintah Provinsi Kalimantan Selatan"
            width={24}
            height={32}
            className="mt-0.5 h-8 w-6 object-contain"
          />
          <div className="space-y-1">
            <p className="font-semibold text-[#0B5D3B]">
              Pemerintah Provinsi Kalimantan Selatan
            </p>
            <p className="text-slate-500">
              © {new Date().getFullYear()} Pemerintah Provinsi Kalimantan Selatan
            </p>
          </div>
        </div>
        <div className="space-y-1 text-slate-500 sm:text-right">
          <p className="font-semibold text-slate-700">Kontak</p>
          <p>Palam, Kec. Cemp., Kota Banjar Baru, Kalimantan Selatan</p>
          <p>Telepon: (0511) 325456</p>
        </div>
      </div>
    </footer>
  );
}
