# Takahashi Family Legacy

Website silsilah + history + gallery keluarga. Vanilla HTML/CSS/JS + Firebase, tanpa build step.

## Struktur file

- `index.html` — halaman utama (hero, tree, history, members, gallery)
- `style.css` — styling halaman utama
- `script.js` — logic render utama (baca data dari Firestore)
- `data.js` — **DEFAULT / SEED data** (cadangan awal, dipakai sekali saat seeding)
- `firebase-config.js` — config Firebase (project `takahashi-fam`)
- `admin.html` — **halaman admin** (login + edit data)
- `admin.js` — logic admin (login, CRUD, simpan ke Firestore)

## Alur data (penting)

Website utama + halaman admin membaca data dari **Firestore** (database cloud), bukan dari `data.js`.

- `data.js` cuma data cadangan: dipakai pertama kali buat seed database, atau kalau Firestore gagal dimuat.
- Setelah data masuk Firestore, **edit data lewat `admin.html`**, bukan lewat `data.js`.

## Cara setup (sekali aja)

1. Bikin akun admin di Firebase Console → **Authentication → Users → Add user** → isi email + password.
2. Buka `admin.html` → login pakai akun itu → klik **"Simpan ke cloud"** (ini nge-seed data contoh ke database).

## Cara jalanin lokal

Buka `index.html` (atau `admin.html`) pakai Live Server di VSCode (klik kanan → "Open with Live Server").

## Cara edit data (rutin)

1. Buka `admin.html` → login.
2. Tab **Anggota**: tambah/edit/hapus orang. Atur "Orangtua" (posisi di pohon) dan "Pasangan".
3. Tab **History / Gallery / Pengaturan**: kelola timeline, foto, nama keluarga & tagline.
4. Klik **"Simpan ke cloud"**. Website utama langsung update dalam beberapa detik.

## Format data

- Tiap orang: `name`, `birth` (YYYY-MM-DD), `death` (kosong kalau masih hidup), `photo` (URL), `bio`.
- Kalau `death` terisi → foto otomatis grayscale + titik merah + "Telah berpulang".
- Foto: sekarang placeholder dicebear. Ganti URL-nya ke foto asli (bisa upload ke folder `assets/` lalu isi `assets/namafile.jpg`).

## Deploy ke Vercel

1. Push folder ini ke repo GitHub.
2. [vercel.com](https://vercel.com) → New Project → import repo.
3. Framework preset **Other**, build command & output dikosongin.
4. Deploy.

## Catatan keamanan

- Firestore sekarang di **test mode** (buat development). Sebelum dipublikasikan, ganti security rules-nya supaya cuma yang login yang bisa nulis. (Tanya Hanju buat rules finalnya.)
- URL `admin.html` jangan disebar bebas — siapapun yang tahu URL-nya tetep harus login dulu buat akses.
