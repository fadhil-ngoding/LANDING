# Kalimaniez Photo Studio — Landing Page (versi statis)

Ini versi **HTML/CSS/JS murni** (tanpa PHP) dari landing page + modal
login/daftar Kalimaniez Photo Studio, supaya bisa langsung di-hosting di
GitHub Pages (atau hosting statis apa pun — Netlify, Vercel, dll).

Bagian dashboard, proses login/daftar ke database, dan semua file PHP
(`hash.php`, `logout.php`, koneksi database) **sengaja tidak disertakan**
karena GitHub Pages tidak menjalankan PHP. Kalau nanti mau login/daftar
benar-benar berfungsi (simpan ke database), itu perlu dipasang di hosting
yang mendukung PHP + MySQL (atau backend/API lain) secara terpisah —
form di sini sudah disiapkan (id `loginForm`, `registerForm` di
`index.html`), tinggal disambungkan ke endpoint kamu di `javascript/landing.js`
pada fungsi `initStaticForms()`.

## Struktur
```
index.html
css/landing.css
javascript/landing.js
gambar/logo.png            ← logo (lihat gambar/BACA-SAYA.txt)
gambar/gallery1.jpeg       ← contoh pas foto 4x6
gambar/gallery2.jpeg       ← contoh pas foto 3x4
gambar/gallery3.jpeg       ← contoh pas foto 2x3
gambar/about.jpeg          ← foto section Tentang
```

## Cara pakai
1. Taruh gambar-gambar kamu di folder `gambar/` sesuai nama di
   `gambar/BACA-SAYA.txt`.
2. Buka `index.html` lewat local server untuk preview (`npx serve .`
   atau `python3 -m http.server 8080`), lalu upload seisi folder ini
   ke GitHub Pages.

## Yang sudah dibenahi di versi ini
- **Tanpa PHP** — semua `<?php ... ?>` dan pengecekan session dihapus;
  tombol Login/Daftar & "Pesan Pas Foto" selalu tampil (karena versi
  statis tidak punya sesi login).
- **Fully responsive** — navbar berubah jadi menu hamburger di layar
  kecil, grid galeri & timeline proses menyesuaikan jadi 1 kolom di HP,
  section Tentang & modal login/daftar dirapikan juga untuk layar sempit.
- **Hanya landing + login/daftar** — bagian dashboard admin/user tidak
  disertakan sama sekali (sesuai permintaan), karena memang butuh PHP +
  database untuk berjalan.
- Modal Login & Daftar tetap ada sebagai tampilan UI lengkap dengan
  toggle show/hide password, tapi form-nya belum tersambung ke server
  mana pun (statis) — akan muncul catatan kecil di bawah tombol submit
  yang menjelaskan ini, alih-alih pura-pura berhasil login.
