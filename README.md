# Heritage Dining - Guest Experience Platform

Platform manajemen restoran _Fine Dining_ modern yang dirancang untuk menciptakan pengalaman tamu yang imersif, mulai dari reservasi _online_ hingga pendamping digital (_Companion App_) saat tamu menikmati hidangan di meja.

## ✨ Fitur Utama

### 🍽️ Public & Reservation (Tamu)

- **Web Profil Restoran**: Halaman Story, Menu, dan Gallery yang elegan.
- **Sistem Reservasi**: Booking meja dengan pilihan tanggal, jam, dan jumlah orang.
- **Email Notifications**: Konfirmasi booking otomatis, pengingat (Reminder), dan ucapan terima kasih via **Resend**.

### 📱 Table Companion App (Dine-in Experience)

Aplikasi web khusus yang diakses tamu saat duduk di meja (via QR Code/Token):

- **Interactive Menu**: Penjelasan detail setiap hidangan per "Chapter" (urutan penyajian).
- **Wine Pairing Guide**: Informasi _pairing_ minuman untuk setiap menu yang disajikan.
- **Digital Service Request**: Fitur panggil layanan (Minta Bill, Refill Air, Napkin) langsung dari HP tanpa memanggil pelayan secara manual.

### 👨‍🍳 Admin & Kitchen Dashboard (Staff)

- **Reservation Management**: Mengelola daftar tamu, assign meja, dan status booking.
- **Kitchen Display System (KDS)**: Tampilan _real-time_ untuk dapur guna memantau _course_ apa yang sedang disantap di setiap meja.
- **Menu Management**: Pengaturan "Chapter" cerita menu dan item makanan musiman.
- **Finance**: Laporan ringkas pendapatan dan deposit.

## 🛠️ Tech Stack

Project ini dibangun menggunakan teknologi _cutting-edge_:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: PostgreSQL dengan [Prisma ORM](https://www.prisma.io/)
- **Email Engine**: [React Email](https://react.email/) & Resend
- **Icons**: Lucide React

## 🚀 Cara Menjalankan (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan project di lokal komputer Anda.

### Prasyarat

- Node.js (v20 atau lebih baru)
- PostgreSQL Database

### Instalasi

1.  **Clone repository:**

    ```bash
    git clone [https://github.com/username/heritage-dining.git](https://github.com/username/heritage-dining.git)
    cd heritage-dining

    ```

2.  **Install dependencies:**
    npm install

3.  **Setup Environment Variables:**
    Buat file .env di root folder dan sesuaikan dengan konfigurasi Anda:

    DATABASE_URL="postgresql://user:password@localhost:5432/heritage_dining"
    RESEND_API_KEY="re_123456..."
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

4.  **Setup Database:**
    Jalankan migrasi database untuk membuat tabel yang diperlukan:

    npx prisma generate
    npx prisma db push

    (Opsional) Isi data awal (seeding):

    npm run prisma:seed

5.  **Jalankan Server Development:**

        npm run dev

        Buka http://localhost:3000 di browser Anda.

        📂 Struktur Folder

    src/app/(public) - Halaman depan (Landing page, Reservasi).

    src/app/(companion) - Aplikasi tamu di meja (/table/:token).

    src/app/admin - Dashboard untuk Staff dan Admin.

    src/components/emails - Template email transaksional.

    src/lib - Server actions, utility functions, dan konfigurasi.

    prisma - Schema database dan script seeding.
    
## 📄 Lisensi
    Project ini dilisensikan di bawah MIT License.
