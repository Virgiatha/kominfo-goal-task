import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata = {
  title: {
    default: "Aplikasi Pencatat Goals",
    template: "%s | Aplikasi Pencatat Goals",
  },
  description:
    "Aplikasi pencatat Goals dan Task Pemerintah Provinsi Kalimantan Selatan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F5F7FA] text-[#1F2937] antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
