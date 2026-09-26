# UI/UX Improvement Specification
## Aplikasi Pencatat Goals dan Task
### Pemerintah Provinsi Kalimantan Selatan

---

## 1. Project Context

Aplikasi ini merupakan aplikasi internal Pemerintah Provinsi Kalimantan Selatan untuk mencatat dan memantau **Goal** beserta **Task** yang menjadi bagian dari Goal tersebut.

### Konsep Utama

- **Goal** adalah sesuatu yang ingin dicapai.
- Setiap Goal memiliki beberapa Task.
- **Task** merupakan langkah kecil untuk mencapai suatu Goal.
- Setiap Task memiliki status.
- Progress Goal dihitung berdasarkan jumlah Task yang selesai.
- Progress harus selalu berada pada rentang **0–100%**.
- Progress diperbarui secara otomatis ketika status Task berubah.

### Rumus Progress

```text
Progress = (Jumlah Task Selesai / Total Task) × 100
```

Contoh:

```text
5 Task
3 selesai

Progress = 3 / 5 × 100
         = 60%
```

### Aturan Progress

1. Ketika Task selesai, progress Goal meningkat.
2. Ketika Task yang sebelumnya selesai dibatalkan, progress Goal menurun.
3. Jika seluruh Task selesai, progress menjadi 100%.
4. Jika tidak ada Task yang selesai, progress menjadi 0%.
5. Progress tidak boleh kurang dari 0%.
6. Progress tidak boleh lebih dari 100%.
7. Perhitungan progress harus konsisten antara backend dan frontend.

---

# 2. Design Direction

Gunakan pendekatan:

> **Modern Government Portal — Diskominfo Kalsel Inspired**

Desain harus memberikan kesan:

- Formal seperti portal pemerintahan
- Profesional dan institusional
- Modern tetapi tetap familiar sebagai website pemerintah daerah
- Bersih dengan section-based layout
- Informatif dan mudah dipindai
- Menggunakan hierarchy visual yang jelas
- Memiliki karakter visual portal Diskominfo Kalsel
- Tidak terlalu dekoratif

Karena aplikasi digunakan dalam konteks **Pemerintah Provinsi Kalimantan Selatan**, gunakan karakter visual portal pemerintahan daerah yang terinspirasi dari website **Diskominfo Provinsi Kalimantan Selatan**. Desain tetap merupakan aplikasi internal Goals/Task, bukan website publik. Jangan membuatnya terlihat seperti:

- Marketplace
- Social media
- Startup landing page
- Website gaming
- Dashboard crypto
- Aplikasi dengan desain terlalu playful

Hindari penggunaan:

- Gradient berlebihan
- Glassmorphism berlebihan
- Animasi berlebihan
- Card dengan radius terlalu besar
- Shadow terlalu kuat
- Warna neon
- Emoji sebagai icon utama
- Typography dekoratif

---

# 3. Government Identity

Gunakan logo resmi Pemerintah Provinsi Kalimantan Selatan yang sudah tersedia di:

```text
/public/logo kalsel.svg
```

Jangan membuat logo baru.

Logo harus digunakan pada:

- Navbar/Header
- Sidebar
- Halaman Login
- Footer jika diperlukan

---

# 4. Government Branding

Identitas Pemerintah Provinsi Kalimantan Selatan harus terlihat jelas tetapi tidak mengambil terlalu banyak ruang.

Contoh struktur header:

```text
[LOGO KALSEL]

PEMERINTAH PROVINSI
KALIMANTAN SELATAN

Aplikasi Pencatat Goals
```

Untuk dashboard desktop:

```text
┌──────────────────────────────────────────────────────────┐
│ LOGO  PEMERINTAH PROVINSI KALIMANTAN SELATAN    USER ▼  │
├───────────────┬──────────────────────────────────────────┤
│               │                                          │
│ Dashboard     │              Dashboard                   │
│ Goals         │                                          │
│ Tasks         │                                          │
│               │                                          │
│               │                                          │
└───────────────┴──────────────────────────────────────────┘
```

---

# 5. Color Palette — Diskominfo Kalsel Inspired

Gunakan palet yang mengambil nuansa visual website pemerintahan/Diskominfo Kalsel: hijau sebagai identitas utama, putih sebagai surface, serta warna netral untuk menjaga keterbacaan. Jangan menyalin warna/asset website reference secara mentah.

## Primary

```text
Primary Dark : #0B5D3B
Primary      : #167A52
Accent       : #D4A72C
Green Soft   : #EAF5EF
```

## Neutral

```text
Background       : #F5F7FA
Surface          : #FFFFFF
Text             : #1F2937
Secondary Text   : #64748B
Border           : #E2E8F0
```

## Usage

### Primary Dark

Gunakan untuk:

- Header
- Sidebar
- Judul tertentu
- Elemen identitas pemerintahan

### Primary

Gunakan untuk:

- Button utama
- Link
- Active navigation
- Progress indicator jika diperlukan

### Accent

Gunakan secara terbatas untuk:

- Informasi
- Highlight
- Status tertentu

### Gold

Gunakan secara sangat terbatas sebagai:

- Highlight identitas
- Decorative accent
- Elemen pendukung branding

Jangan menggunakan seluruh warna sekaligus pada setiap halaman.

---

# 5.1. Visual Reference Theme

Gunakan website resmi **Diskominfo Provinsi Kalimantan Selatan** hanya sebagai referensi tema visual:

```text
https://diskominfo.kalselprov.go.id/
```

Yang boleh ditiru sebagai **arah visual**, bukan disalin:
- Nuansa portal pemerintahan daerah
- Dominasi warna hijau dan white space
- Header/navigation yang formal
- Section dan card yang clean
- Gaya typography yang mudah dibaca
- Hierarki informasi seperti portal pemerintahan
- Penggunaan aksen gold secara terbatas
- Visual yang informatif dan institutional

Jangan mengubah:
- Struktur fitur
- Business logic
- API
- Database
- Route
- Terminology Goal/Task
- Behavior progress
- Authentication
- Existing component/functionality

Jangan menyalin:
- Logo Diskominfo
- Foto/banner website reference
- Konten berita
- Teks website reference
- Asset website reference
- Identitas Diskominfo sebagai nama aplikasi

Tetap gunakan identitas aplikasi yang sudah ditentukan dan logo:

```text
/public/logo kalsel.svg
```

# 6. Typography

Gunakan font yang sederhana dan profesional.

Prioritas:

```text
Inter
atau
system-ui
```

Hierarchy:

```text
Page Title
→ text-2xl / text-3xl
→ font-bold

Section Title
→ text-lg / text-xl
→ font-semibold

Body
→ text-sm / text-base

Secondary Text
→ text-sm
→ text-slate-500
```

Hindari font dekoratif.

---

# 7. Layout

Pertahankan layout dashboard dengan sidebar untuk desktop, tetapi ubah **visual theme** agar mengambil nuansa portal pemerintahan Diskominfo Kalsel: header hijau, active navigation hijau, section putih, dan aksen gold yang sangat terbatas.

Struktur:

```text
┌──────────────────────────────────────────────────────┐
│ Header                                               │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│ Sidebar       │ Main Content                         │
│               │                                      │
│ Dashboard     │                                      │
│ Goals         │                                      │
│ Tasks         │                                      │
│               │                                      │
└───────────────┴──────────────────────────────────────┘
```

Sidebar berisi:

```text
Dashboard
Goals
Tasks
```

Gunakan icon sederhana dari library seperti **Lucide React** jika library sudah tersedia.

Jangan menggunakan emoji sebagai icon utama.

---

# 8. Header

Header harus sederhana dan formal, dengan visual yang terasa seperti portal resmi pemerintah daerah dan menggunakan nuansa hijau khas pemerintahan Kalsel.

Isi:

- Logo Kalsel
- Nama Pemerintah Provinsi Kalimantan Selatan
- Nama aplikasi
- User/profile menu

Contoh:

```text
┌───────────────────────────────────────────────────────────┐
│ [LOGO] PEMERINTAH PROVINSI KALIMANTAN SELATAN    User ▼ │
│        Aplikasi Pencatat Goals                            │
└───────────────────────────────────────────────────────────┘
```

User menu dapat berisi:

```text
Nama User
Role
────────────────
Profil
Logout
```

Role hanya ditampilkan jika tersedia dari backend.

---

# 9. Sidebar

Sidebar harus terlihat sederhana dan profesional dengan nuansa portal pemerintahan. Gunakan primary green untuk active state dan white/light-green untuk surface.

Menu:

```text
Dashboard
Goals
Tasks
```

Active menu harus memiliki visual yang jelas.

Contoh:

```text
Dashboard
Goals       ← active
Tasks
```

Active state dapat menggunakan:

```text
background primary
text white
```

atau kombinasi:

```text
background soft blue
text primary dark
```

Jangan menggunakan animasi berlebihan.

---

# 10. Dashboard

Dashboard merupakan halaman utama setelah login.

Tujuan dashboard:

- Menampilkan kondisi Goal secara cepat
- Menampilkan jumlah Task
- Menampilkan progress
- Membantu user mengetahui pekerjaan yang belum selesai

## 10.1 Summary Cards

Gunakan beberapa summary card.

Contoh:

```text
┌─────────────────┐
│ Total Goals     │
│                 │
│      12         │
└─────────────────┘

┌─────────────────┐
│ Active Goals    │
│                 │
│       7         │
└─────────────────┘

┌─────────────────┐
│ Completed Goals │
│                 │
│       5         │
└─────────────────┘

┌─────────────────┐
│ Total Tasks     │
│                 │
│      42         │
└─────────────────┘
```

Gunakan card sederhana.

Jangan membuat card terlalu besar.

---

# 11. Active Goals

Di bawah summary card, tampilkan daftar Goal yang sedang berjalan.

Contoh:

```text
Goal Aktif

Belajar Bahasa Asing
████████████░░░░ 75%

6 dari 8 Task selesai

Status: Berjalan
```

Informasi yang ditampilkan:

- Nama Goal
- Progress
- Jumlah Task selesai
- Total Task
- Status
- Tombol/detail link

---

# 12. Pending Tasks

Dashboard juga dapat menampilkan beberapa Task yang belum selesai.

Contoh:

```text
Task Belum Selesai

□ Hafal 50 kata
□ Latihan listening
□ Membaca artikel
□ Membuat rangkuman
```

Jika jumlah Task banyak, tampilkan beberapa Task terbaru dan tombol:

```text
Lihat Semua Task
```

---

# 13. Goal List

Halaman Goals menampilkan seluruh Goal.

Contoh:

```text
Goals

[ + Tambah Goal ]

┌────────────────────────────────────────────┐
│ Belajar Bahasa Asing                       │
│                                            │
│ Progress                                   │
│ ███████████████░░░ 75%                     │
│                                            │
│ 6 / 8 Task selesai                         │
│ Status: Berjalan                           │
│                                            │
│ [Lihat Detail]                             │
└────────────────────────────────────────────┘
```

Setiap Goal minimal memiliki:

- Nama Goal
- Progress
- Jumlah Task selesai
- Total Task
- Status
- Action

---

# 14. Goal Detail

Ketika user membuka sebuah Goal, tampilkan halaman detail.

Struktur:

```text
← Kembali ke Goals

Belajar Bahasa Asing

Progress
██████████████░░░░ 75%

6 dari 8 Task selesai

Tasks

[ + Tambah Task ]

✓ Hafal 50 kata
✓ Pelajari grammar dasar
✓ Latihan membaca

○ Latihan listening
○ Speaking practice
```

---

# 15. Goal Progress

Progress bar harus:

- Simple
- Mudah dibaca
- Tidak menggunakan gradient berlebihan
- Memiliki persentase yang jelas

Contoh:

```text
Progress

██████████████░░░░░░ 70%

7 dari 10 Task selesai
```

Progress bar dapat menggunakan tinggi sekitar:

```text
8px – 10px
```

Gunakan:

```text
rounded-lg
```

bukan bentuk terlalu bulat seperti pill jika tidak diperlukan.

---

# 16. Task

Task merupakan bagian dari Goal.

Setiap Task harus menampilkan:

- Nama Task
- Status
- Action

Contoh:

```text
✓ Hafal 50 kata
  Selesai

○ Latihan listening
  Belum selesai

○ Speaking practice
  Belum selesai
```

Gunakan checkbox atau icon status jika sesuai dengan behavior aplikasi.

---

# 17. Task Status

Gunakan status yang jelas.

Contoh:

```text
Belum selesai
Selesai
Dibatalkan
```

Jika backend sudah memiliki terminology status sendiri, gunakan terminology backend dan jangan mengubah business logic.

Status harus mudah dibedakan secara visual.

Namun jangan hanya mengandalkan warna.

Contoh:

```text
✓ Selesai
○ Belum selesai
× Dibatalkan
```

---

# 18. Add Goal

Form tambah Goal harus sederhana.

Contoh:

```text
Tambah Goal

Nama Goal
[____________________________]

Deskripsi
[____________________________]
[____________________________]

              [Batal] [Simpan]
```

Field hanya perlu ditampilkan sesuai dengan field yang memang tersedia di backend.

Jangan membuat field dummy yang tidak digunakan.

---

# 19. Edit Goal

Edit Goal menggunakan form yang sama dengan Add Goal.

Contoh:

```text
Edit Goal

Nama Goal
[ Belajar Bahasa Asing ]

Deskripsi
[ Ingin meningkatkan kemampuan bahasa ]

              [Batal] [Simpan Perubahan]
```

---

# 20. Delete Goal

Delete merupakan destructive action.

Gunakan confirmation dialog.

Contoh:

```text
Hapus Goal?

Apakah Anda yakin ingin menghapus
"Belajar Bahasa Asing"?

Tindakan ini tidak dapat dibatalkan.

[Batal] [Hapus]
```

Gunakan visual danger hanya pada action destructive.

---

# 21. Add Task

Form:

```text
Tambah Task

Nama Task
[____________________________]

Goal
[ Belajar Bahasa Asing ]

              [Batal] [Simpan]
```

Field mengikuti struktur backend.

---

# 22. Task Actions

Task dapat memiliki action seperti:

```text
Selesai
Edit
Hapus
```

Jika status diubah:

```text
Belum selesai
      ↓
Selesai
```

maka progress Goal harus diperbarui otomatis.

---

# 23. Progress Behavior

Frontend tidak boleh melakukan perhitungan yang berbeda dari backend.

Business logic utama harus tetap konsisten.

Contoh:

```text
Total Task = 5
Task selesai = 3

Progress = 60%
```

Jika satu Task berubah menjadi selesai:

```text
Total Task = 5
Task selesai = 4

Progress = 80%
```

Jika Task selesai dibatalkan:

```text
Total Task = 5
Task selesai = 3

Progress = 60%
```

Jika seluruh Task selesai:

```text
Total Task = 5
Task selesai = 5

Progress = 100%
```

Frontend harus menampilkan hasil dari backend setelah perubahan data berhasil.

---

# 24. Loading State

Setiap proses asynchronous harus memiliki loading state.

Contoh:

```text
Memuat Goals...
```

atau skeleton.

Untuk button:

```text
Menyimpan...
```

Button harus disabled selama request berlangsung untuk mencegah duplicate request.

---

# 25. Empty State

Jika belum ada Goal:

```text
Belum Ada Goal

Anda belum memiliki Goal.

[ + Tambah Goal ]
```

Jika Goal belum memiliki Task:

```text
Belum Ada Task

Goal ini belum memiliki Task.

[ + Tambah Task ]
```

Empty state harus tetap sederhana dan tidak terlalu dekoratif.

---

# 26. Error State

Jika API gagal:

```text
Terjadi Kesalahan

Data tidak dapat dimuat.
Silakan coba lagi.

[ Coba Lagi ]
```

Jika error berasal dari backend dan memiliki message yang aman untuk ditampilkan, gunakan message tersebut.

Jangan menampilkan:

- Stack trace
- SQL error
- Informasi internal server
- Credential
- Token

---

# 27. Toast / Feedback

Setelah action berhasil, berikan feedback singkat.

Contoh:

```text
✓ Goal berhasil ditambahkan.
```

```text
✓ Task berhasil diperbarui.
```

```text
✓ Task berhasil dihapus.
```

Jika gagal:

```text
Gagal menyimpan Task.
Silakan coba lagi.
```

Feedback tidak perlu terlalu lama.

---

# 28. Login Page

Halaman login harus formal.

Contoh:

```text
              [LOGO KALSEL]

       PEMERINTAH PROVINSI
        KALIMANTAN SELATAN

       Aplikasi Pencatat Goals


Username / Email
[________________________]

Password
[________________________]

[        MASUK        ]
```

Gunakan background yang sederhana.

Hindari:

- Hero image besar
- Gradient berlebihan
- Animasi
- Decorative illustration berlebihan

---

# 29. Responsive Design

Aplikasi harus responsive.

## Desktop

Gunakan:

```text
Sidebar + Main Content
```

## Tablet

Sidebar dapat diperkecil atau menggunakan drawer.

## Mobile

Sidebar menjadi:

```text
Hamburger Menu
```

Main content menggunakan:

```text
width: 100%
```

Card dapat menjadi satu kolom.

Contoh desktop:

```text
┌──────┬──────┬──────┬──────┐
│ Card │ Card │ Card │ Card │
└──────┴──────┴──────┴──────┘
```

Mobile:

```text
┌──────────────┐
│ Card         │
├──────────────┤
│ Card         │
├──────────────┤
│ Card         │
└──────────────┘
```

---

# 30. Accessibility

Pastikan:

- Semua input memiliki label.
- Button memiliki nama yang jelas.
- Image memiliki `alt`.
- Icon-only button memiliki `aria-label`.
- Focus state terlihat.
- Kontras warna cukup.
- Jangan hanya menggunakan warna untuk membedakan status.
- Keyboard navigation tetap dapat digunakan.

Contoh:

```jsx
<img
    src="/logo kalsel.svg"
    alt="Logo Pemerintah Provinsi Kalimantan Selatan"
/>
```

---

# 31. Button Hierarchy

Gunakan tiga jenis button utama.

## Primary

Untuk action utama:

```text
Simpan
Tambah Goal
Tambah Task
Masuk
```

Style:

```text
Primary background
White text
```

## Secondary

Untuk action alternatif:

```text
Batal
Kembali
```

Style:

```text
Soft gray background
Dark text
```

## Danger

Untuk destructive action:

```text
Hapus
```

Style:

```text
Red background
White text
```

Jangan menggunakan danger button untuk action biasa.

---

# 32. Border & Shadow

Gunakan border yang subtle.

Contoh Tailwind:

```text
border border-slate-200
```

Shadow:

```text
shadow-sm
```

Hindari:

```text
shadow-2xl
```

untuk hampir semua card.

---

# 33. Border Radius

Gunakan radius secara moderat.

Rekomendasi:

```text
rounded-lg
rounded-xl
```

Untuk button:

```text
rounded-lg
```

atau jika desain existing sudah menggunakan pill:

```text
rounded-full
```

Namun jangan semua elemen menggunakan `rounded-full`.

---

# 34. Component Structure

Gunakan reusable components.

Struktur yang direkomendasikan:

```text
components/
├── Navbar/
├── Sidebar/
├── UserMenu/
├── Button/
├── Input/
├── Modal/
├── ConfirmDialog/
├── GoalCard/
├── GoalProgress/
├── TaskItem/
├── TaskList/
├── EmptyState/
├── LoadingSkeleton/
└── ErrorState/
```

Jika project saat ini sudah memiliki component yang fungsinya sama, **reuse component tersebut** daripada membuat duplicate component.

---

# 35. Suggested App Structure

Untuk Next.js App Router:

```text
app/
├── layout.js
├── page.js
├── globals.css
│
├── login/
│   └── page.js
│
├── goals/
│   ├── page.js
│   ├── create/
│   │   └── page.js
│   └── [id]/
│       ├── page.js
│       └── edit/
│           └── page.js
│
└── tasks/
    └── page.js
```

Struktur dapat disesuaikan dengan routing yang sudah ada.

Jangan mengubah route yang sudah digunakan oleh project tanpa alasan.

---

# 36. Existing Navbar

Jika project sudah memiliki:

```text
components/Navbar.js
```

gunakan component tersebut dan lakukan redesign jika diperlukan.

Jangan membuat Navbar baru dengan nama berbeda jika Navbar lama masih digunakan.

---

# 37. Existing Button

Jika project sudah memiliki:

```text
components/Button.js
```

gunakan kembali component tersebut.

Button harus mendukung minimal:

```text
primary
secondary
danger
loading
disabled
```

Contoh penggunaan:

```jsx
<Button>
    Simpan
</Button>
```

---

# 38. Tailwind CSS

Jika project menggunakan Tailwind CSS, gunakan Tailwind sebagai styling utama.

Contoh:

```jsx
<div className="flex items-center justify-between">
```

```jsx
<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
```

```jsx
<button className="rounded-lg bg-[#1E5A82] px-5 py-2.5 font-semibold text-white hover:bg-[#123B5D]">
    Simpan
</button>
```

Hindari inline style jika styling dapat dilakukan menggunakan Tailwind.

---

# 39. API Layer

API call harus dipisahkan dari UI component.

Gunakan:

```text
lib/api.js
```

Contoh function:

```text
getGoals()
getGoal(id)
createGoal(data)
updateGoal(id, data)
deleteGoal(id)

getTasks(goalId)
createTask(data)
updateTask(id, data)
deleteTask(id)
updateTaskStatus(id, status)
```

Component tidak perlu mengetahui detail endpoint secara langsung jika sudah tersedia API layer.

---

# 40. Frontend Architecture

Gunakan pemisahan:

```text
UI
 ↓
Component
 ↓
API Layer
 ↓
Express.js Backend
 ↓
MySQL
```

Contoh:

```text
GoalCard
   ↓
goal action
   ↓
lib/api.js
   ↓
Express API
   ↓
MySQL
```

---

# 41. Backend Business Logic

Business logic progress harus tetap dipertahankan.

Frontend hanya bertugas:

- Menampilkan data
- Mengirim perubahan
- Menampilkan feedback
- Refresh/update UI

Backend bertugas memastikan:

- Status Task valid
- Progress valid
- Progress 0–100
- Perhitungan progress konsisten
- Data tersimpan dengan benar

---

# 42. Data Flow Example

Ketika user menyelesaikan Task:

```text
User klik "Selesai"
        ↓
Frontend mengirim request
        ↓
Backend mengubah status Task
        ↓
Backend menghitung ulang progress Goal
        ↓
Backend mengembalikan data terbaru
        ↓
Frontend memperbarui UI
```

Jangan hanya mengubah angka progress secara manual di frontend tanpa memastikan backend sudah berhasil memperbarui data.

---

# 43. Navigation

Gunakan Next.js `Link` untuk navigasi.

Contoh:

```jsx
<Link href="/goals">
    Goals
</Link>
```

Gunakan `Button` untuk action.

Contoh:

```jsx
<Button>
    Simpan
</Button>
```

Prinsip:

```text
Link = pergi ke halaman

Button = melakukan tindakan
```

Jangan menggunakan `Button` untuk navigasi biasa jika `Link` sudah cukup.

---

# 44. Metadata

Gunakan metadata halaman agar title browser jelas.

Contoh:

```jsx
export const metadata = {
    title: "Goals",
};
```

Jika root layout menggunakan template:

```jsx
export const metadata = {
    title: {
        default: "Aplikasi Pencatat Goals",
        template: "%s | Aplikasi Pencatat Goals",
    },
    description: "Aplikasi pencatat Goals dan Task Pemerintah Provinsi Kalimantan Selatan",
};
```

Maka halaman:

```text
Goals
```

akan menjadi:

```text
Goals | Aplikasi Pencatat Goals
```

---

# 45. Terminology

Gunakan Bahasa Indonesia untuk UI.

Contoh:

```text
Dashboard
Goals
Tasks
Tambah Goal
Tambah Task
Selesai
Belum Selesai
Dibatalkan
Simpan
Batal
Hapus
Edit
Lihat Detail
```

Pertahankan istilah:

```text
Goal
Task
```

jika terminology tersebut memang digunakan dalam requirement aplikasi.

---

# 46. Icons

Gunakan icon library yang sudah tersedia di project.

Jika menggunakan Lucide React:

```jsx
import {
    LayoutDashboard,
    Target,
    CheckSquare,
    Plus,
    Pencil,
    Trash2,
    ArrowLeft
} from "lucide-react";
```

Contoh:

```jsx
<Plus size={18} />
```

Gunakan icon untuk membantu visualisasi, bukan sebagai pengganti label yang penting.

---

# 47. Avoid Overdesign

Jangan membuat dashboard terlalu ramai.

Prioritas:

```text
Information
    ↓
Hierarchy
    ↓
Usability
    ↓
Visual polish
```

Bukan:

```text
Animation
    ↓
Decoration
    ↓
Gradient
    ↓
Content
```

---

# 48. Responsive Card

Goal card harus dapat menyesuaikan ukuran layar.

Desktop:

```text
grid-cols-3
```

Tablet:

```text
md:grid-cols-2
```

Mobile:

```text
grid-cols-1
```

Contoh:

```jsx
<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
```

---

# 49. Mobile Goal Detail

Pada mobile, jangan memaksakan layout horizontal yang terlalu lebar.

Desktop:

```text
Goal Name                 Progress
                           75%
```

Mobile:

```text
Goal Name

Progress
████████████░░░ 75%
```

---

# 50. Table vs Card

Jika Task ditampilkan dalam tabel pada desktop:

```text
Task
Status
Goal
Action
```

Pada mobile, ubah menjadi card jika tabel terlalu sempit.

Desktop:

```text
┌──────────────┬──────────┬──────────┐
│ Task         │ Status   │ Action   │
├──────────────┼──────────┼──────────┤
│ Hafal 50 kata│ Selesai  │ Edit     │
└──────────────┴──────────┴──────────┘
```

Mobile:

```text
┌─────────────────────┐
│ Hafal 50 kata       │
│ Selesai             │
│                     │
│ Edit | Hapus        │
└─────────────────────┘
```

---

# 51. Do Not Add Unnecessary Features

Jangan menambahkan fitur yang tidak terdapat dalam requirement hanya untuk membuat aplikasi terlihat lebih kompleks.

Hindari menambahkan tanpa kebutuhan:

- Chat
- Notification center kompleks
- Calendar
- Social features
- Gamification
- Ranking user
- Achievement
- Marketplace
- Payment
- AI chatbot

Fokus pada:

```text
Goal
Task
Status
Progress
```

---

# 52. Existing Data Must Be Preserved

Jangan mengganti dummy data atau data API dengan data baru hanya untuk kebutuhan UI.

Jika backend sudah tersedia:

```text
Gunakan data dari backend.
```

Jangan hardcode:

```jsx
const goals = [
    ...
];
```

jika data sebenarnya sudah tersedia dari API.

---

# 53. Error Prevention

Pastikan UI menangani:

```text
API offline
401 Unauthorized
403 Forbidden
404 Not Found
422 Validation Error
500 Server Error
Empty Response
Network Error
```

Pesan yang ditampilkan kepada user harus sederhana dan mudah dipahami.

---

# 54. Login Authentication

Jika backend sudah menyediakan authentication:

```text
Login
 ↓
Backend
 ↓
Token/session
 ↓
Dashboard
```

Frontend jangan membuat authentication dummy jika backend sudah tersedia.

Jangan menyimpan password plaintext.

Jangan menampilkan token kepada user.

---

# 55. UI State

Setiap halaman utama minimal memiliki:

```text
Loading
Success
Empty
Error
```

Contoh:

```text
Loading:
Memuat Goals...

Success:
Daftar Goals

Empty:
Belum ada Goal.

Error:
Gagal memuat Goals.
```

---

# 56. Final Visual Direction — Diskominfo Kalsel Inspired

Visual akhir harus terasa seperti **aplikasi internal Pemerintah Provinsi Kalimantan Selatan dengan tema visual yang terinspirasi dari portal Diskominfo Kalsel**:

```text
Government Portal Style
        +
Diskominfo Kalsel Inspired Visual
        +
Simple Enterprise Application
```

Bukan:

```text
Marketplace
Startup
Social Media
Gaming
Crypto Dashboard
```

---

# 57. Implementation Rules

Sebelum melakukan perubahan UI:

1. Inspect struktur project terlebih dahulu.
2. Inspect `app/`.
3. Inspect `components/`.
4. Inspect `lib/`.
5. Inspect `globals.css`.
6. Inspect konfigurasi Tailwind.
7. Inspect existing API layer.
8. Cari logo:
   `/public/logo kalsel.svg`
9. Reuse component yang sudah ada.
10. Jangan membuat duplicate component jika tidak diperlukan.
11. Jangan mengubah business logic.
12. Jangan mengubah API contract tanpa alasan.
13. Jangan menghapus fitur yang sudah berjalan.
14. Jangan mengganti route yang sudah digunakan.
15. Pastikan semua import tetap valid.
16. Pastikan aplikasi tetap dapat dijalankan setelah perubahan.

---

# 58. AI Coding Agent Instruction

Jika specification ini diberikan kepada AI coding agent, gunakan instruksi berikut:

> Anda bertugas memperbaiki UI/UX aplikasi berdasarkan specification ini.
>
> Sebelum melakukan perubahan, periksa struktur project yang sudah ada dan pahami architecture Next.js, component, API layer, serta routing.
>
> Jangan mengasumsikan project adalah marketplace.
>
> Aplikasi ini adalah **Aplikasi Pencatat Goals dan Tasks untuk Pemerintah Provinsi Kalimantan Selatan**.
>
> Gunakan logo yang sudah tersedia:
>
> `/public/logo kalsel.svg`
>
> Jangan membuat logo baru.
>
> Gunakan pendekatan **Modern Government Dashboard** yang formal, profesional, bersih, dan modern.
>
> Reuse component yang sudah ada jika memungkinkan.
>
> Jangan membuat duplicate component tanpa kebutuhan.
>
> Jangan mengubah business logic Goal, Task, status, dan progress.
>
> Jangan mengganti API contract tanpa alasan.
>
> Jangan menggunakan dummy data jika data dari backend sudah tersedia.
>
> Pastikan progress tetap mengikuti hasil backend.
>
> Pastikan semua route dan import yang sudah ada tetap berjalan.
>
> Gunakan Tailwind CSS jika project memang sudah menggunakannya.
>
> Gunakan Bahasa Indonesia pada UI.
>
> Pertahankan istilah `Goal` dan `Task` jika terminology tersebut sudah digunakan pada requirement.
>
> Prioritaskan usability, accessibility, responsive design, dan visual hierarchy dibandingkan dekorasi.
>
> Setelah implementasi, periksa kembali:
>
> - Navbar
> - Sidebar
> - Login
> - Dashboard
> - Goals
> - Goal Detail
> - Tasks
> - Add Goal
> - Edit Goal
> - Add Task
> - Edit Task
> - Delete confirmation
> - Loading state
> - Empty state
> - Error state
> - Responsive mobile
> - Logo Kalsel
> - API integration
> - Progress calculation
>
> Jangan menambahkan fitur baru yang tidak terdapat dalam requirement.

---

# 59. Final Checklist

## Branding

- [ ] Logo Kalsel digunakan
- [ ] Identitas Pemerintah Provinsi Kalimantan Selatan terlihat
- [ ] Warna formal
- [ ] Tidak terlihat seperti marketplace
- [ ] Tidak menggunakan gradient berlebihan

## Navigation

- [ ] Navbar tersedia
- [ ] Sidebar tersedia pada desktop
- [ ] Mobile navigation tersedia
- [ ] Active state jelas
- [ ] Link digunakan untuk navigation

## Dashboard

- [ ] Total Goals
- [ ] Active Goals
- [ ] Completed Goals
- [ ] Total Tasks
- [ ] Progress
- [ ] Active Goals
- [ ] Pending Tasks

## Goals

- [ ] Goal list
- [ ] Add Goal
- [ ] Edit Goal
- [ ] Delete Goal
- [ ] Goal Detail
- [ ] Progress

## Tasks

- [ ] Task list
- [ ] Add Task
- [ ] Edit Task
- [ ] Delete Task
- [ ] Change status
- [ ] Progress automatically updated

## State

- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Success feedback

## Responsive

- [ ] Desktop
- [ ] Tablet
- [ ] Mobile

## Accessibility

- [ ] Label input
- [ ] Alt logo
- [ ] Keyboard navigation
- [ ] Focus state
- [ ] Sufficient contrast
- [ ] aria-label untuk icon-only button

## Technical

- [ ] Existing API tetap digunakan
- [ ] Backend business logic tidak diubah sembarangan
- [ ] Tidak ada dummy data jika API tersedia
- [ ] Existing routes tetap berjalan
- [ ] Existing components direuse
- [ ] Tidak ada duplicate component yang tidak diperlukan
- [ ] Semua import valid
- [ ] Application dapat dijalankan tanpa error

---

# 60. Expected Result

Hasil akhir aplikasi harus terlihat seperti aplikasi internal pemerintahan modern:

```text
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] PEMERINTAH PROVINSI KALIMANTAN SELATAN       USER ▼ │
├────────────────┬────────────────────────────────────────────┤
│                │                                            │
│ Dashboard      │  Dashboard                                 │
│                │                                            │
│ Goals          │  ┌────────┐ ┌────────┐ ┌────────┐        │
│                │  │ Goals  │ │ Active │ │ Tasks  │        │
│ Tasks          │  │   12   │ │    7   │ │   42   │        │
│                │  └────────┘ └────────┘ └────────┘        │
│                │                                            │
│                │  Goal Aktif                                │
│                │                                            │
│                │  Belajar Bahasa Asing                       │
│                │  ███████████████░░░ 75%                    │
│                │  6 / 8 Task selesai                        │
│                │                                            │
│                │  [Lihat Detail]                            │
│                │                                            │
└────────────────┴────────────────────────────────────────────┘
```

**Prinsip utama:**

> Formal seperti portal pemerintahan daerah, memiliki nuansa visual Diskominfo Kalsel, modern seperti aplikasi enterprise, tetapi tetap sederhana dan mudah digunakan.
