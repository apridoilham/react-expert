# 🚀 Aplikasi Forum Diskusi (Dicoding Submission)

Ini adalah proyek submission untuk kelas **"Membangun Aplikasi React dengan Redux"** di Dicoding. Aplikasi ini berupa platform forum diskusi modern yang memungkinkan pengguna untuk mendaftar, login, melihat thread, membuat diskusi baru, berkomentar, dan memberikan vote pada thread.

Aplikasi ini dibangun menggunakan **React** dan **Redux Toolkit** untuk manajemen state, serta terhubung langsung ke [Dicoding Forum API](https://forum-api.dicoding.dev/v1).

## 🛠️ Tumpukan Teknologi (Tech Stack)

Proyek ini dibangun menggunakan teknologi modern frontend:

- **[React](https://reactjs.org/)** - Library JavaScript untuk membangun antarmuka pengguna.
- **[Vite](https://vitejs.dev/)** - Frontend tool modern yang sangat cepat.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Cara standar dan modern untuk menulis logika Redux.
- **[React Redux](https://react-redux.js.org/)** - Pengikat (bindings) resmi React untuk Redux.
- **[React Router](https://reactrouter.com/)** - Pustaka routing standar untuk React.
- **[Axios](https://axios-http.com/)** - HTTP client berbasis Promise untuk memanggil API.
- **[ESLint](https://eslint.org/)** - Linter untuk menemukan dan memperbaiki masalah pada kode (menggunakan _StandardJS Style Guide_).

---

## 🚀 Fitur Utama

Aplikasi ini mengimplementasikan semua kriteria wajib dan kriteria saran dari submission:

- **Autentikasi:** Pengguna dapat mendaftar (`/register`) dan masuk (`/login`) ke aplikasi.
- **Manajemen State (Redux):** Hampir seluruh state global (data API) dikelola oleh Redux Store.
- **Arsitektur Asinkron:** Semua pemanggilan API diabstraksi menggunakan `createAsyncThunk` dari Redux Toolkit.
- **Daftar Thread:** Menampilkan semua thread diskusi di halaman utama, lengkap dengan informasi pembuat thread.
- **Detail Thread:** Melihat detail lengkap thread, termasuk isi, pemilik, dan semua komentar.
- **Buat Thread:** Pengguna yang sudah login dapat membuat thread diskusi baru.
- **Buat Komentar:** Pengguna yang sudah login dapat membalas dan berkomentar pada sebuah thread.
- **Sistem Vote (⭐ Unggulan):** Pengguna dapat memberi _up-vote_ dan _down-vote_ pada thread dan komentar.
- **Pembaruan Optimistis (⭐ Unggulan):** Fitur vote menerapkan _Optimistic Updates_ untuk UX yang sangat responsif.
- **Leaderboard (⭐ Unggulan):** Menampilkan halaman papan peringkat pengguna dengan skor tertinggi.
- **Filter Kategori (⭐ Unggulan):** Memfilter daftar thread berdasarkan kategori di halaman utama (murni _client-side_).
- **Loading Indicator:** Menampilkan spinner loading kustom saat mengambil data dari API.
- **Desain Responsif:** Tampilan modern dengan _glassmorphism_, tema aurora, dan palet warna kustom.

---

## ⚙️ Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini**

    ```bash
    git clone https://[URL-REPOSITORI-ANDA].git
    cd [NAMA-FOLDER-PROYEK]
    ```

2.  **Instal dependensi**
    Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal.

    ```bash
    npm install
    ```

3.  **Jalankan aplikasi**
    Aplikasi akan berjalan dalam mode pengembangan.

    ```bash
    npm run dev
    ```

4.  **Buka di browser**
    Buka [http://localhost:5173](http://localhost:5173) (atau port lain yang ditampilkan di terminal) di browser Anda.

---

## 📜 Skrip yang Tersedia

- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan dengan HMR.
- `npm run build`: Membangun aplikasi untuk produksi.
- `npm run lint`: Menjalankan ESLint untuk memeriksa masalah gaya penulisan kode.
- `npm run preview`: Menjalankan server lokal untuk meninjau hasil build produksi.

---

- Proyek ini dibuat sebagai bagian dari submission kelas **Membangun Aplikasi React dengan Redux** di **[Dicoding Indonesia](https://dicoding.com)**.
- API disediakan oleh **Dicoding Forum API**.
