# Personal Library — Capstone Project

Aplikasi ini merupakan sistem manajemen perpustakaan pribadi berbasis web yang dibangun untuk keperluan Capstone Project-Code Generations and Optimization with IBM Granite-Student Developer Initiative.


## Project Overview

Proyek ini dibuat untuk membantu pengguna dalam mencatat dan mengelola koleksi buku pribadi secara digital. Pengguna dapat menyimpan informasi buku seperti judul, penulis, jumlah halaman, jumlah halaman yang sudah dibaca, tahun terbit, genre, serta cover gambar buku.
Tujuan utama dari proyek ini adalah membangun aplikasi fullstack dengan fitur CRUD lengkap, autentikasi pengguna, dan pengelolaan data berbasis database non-relasional.
Seluruh sistem dikembangkan dari awal dengan membagi struktur kerja menjadi frontend dan backend secara terpisah.


## Fitur

- Autentikasi login dan registrasi berbasis JWT
- Dashboard buku dengan tampilan grid responsif
- Tambah buku baru dengan upload cover dari file lokal
- Edit data buku (termasuk status baca otomatis berdasarkan progress halaman)
- Form add & edit mendukung multiple genre
- Modal detail buku
- Hapus buku dari koleksi
- Filter berdasarkan status dan genre (masih dalam pengembangan)
- Kustomisasi rak buku (masih dalam pengembangan)
- Share list bacaan pada setiap rak buku (masih dalam pengembangan)


## Teknologi yang Digunakan

### Frontend
- HTML, Tailwind CSS
- Vanilla JavaScript
- Fetch API
- Struktur folder modular (index, my-shelf, edit-book, add-book)

### Backend
- Node.js dengan Express
- MongoDB (melalui Mongoose)
- Cloudinary (untuk upload cover image)
- JWT Authentication
- Dotenv untuk manajemen variabel lingkungan
- Express Middleware (untuk otorisasi, error handler, dll)


## Cara Menjalankan

1. Clone repository ini
2. Install dependencies di folder backend
3. Buat file `.env` di folder backend dengan variabel:
   MONGO_URI=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   JWT_SECRET=
4. Jalankan backend: `node server.js`
5. Jalankan frontend di browser dengan membuka `login.html`


## Deployment

(https://superlative-griffin-405691.netlify.app/login.html)


## Peran IBM Granite dalam Proyek

Pada tahap awal pengembangan backend, saya memanfaatkan IBM Granite, sebuah model AI dari IBM yang unggul dalam pemahaman kode dan struktur proyek. Granite sangat membantu saya dalam:
1. Menentukan struktur folder backend yang rapi dan modular
2. Membuat draft awal file seperti route, controller, dan model
3. Memberikan saran teknis yang relevan dan sesuai praktik industri
Setelah struktur dasar terbentuk dengan bantuan Granite, proses pengembangan dilanjutkan sepenuhnya secara manual. Saya menyusun logika backend, koneksi database, middleware autentikasi, hingga integrasi penyimpanan gambar ke Cloudinary secara mandiri.
Dukungan Granite pada fase awal ini memberikan landasan yang kokoh dan mempercepat orientasi saya dalam membangun backend berbasis Node.js dan MongoDB.
