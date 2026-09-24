import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata = {
  title: {
    default: "Sistem Kinerja",
    template: "%s | Sistem Kinerja",
  },
  description: "Sistem pemantauan Sasaran Kerja dan Rencana Kerja Pemerintah Provinsi Kalimantan Selatan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#f4f6f8] text-slate-800 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}