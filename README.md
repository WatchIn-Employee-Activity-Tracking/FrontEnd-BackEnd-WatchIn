# 🕵️‍♂️ WatchIn - Employee Activity Tracking

WatchIn adalah aplikasi untuk memantau aktivitas karyawan secara real-time. Proyek ini menggunakan **Vanilla JavaScript**, **Tailwind CSS**, dan **Webpack** untuk frontend, serta **Node.js** dan **Express.js** untuk backend.

---

## 🧰 Teknologi yang Digunakan

### Frontend
- Vanilla JavaScript
- Tailwind CSS
- Webpack

### Backend
- Node.js
- Express.js

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/username/watchin.git
cd watchin
```

### 2. Install Dependency
```bash
npm install
```

### 3. Jalankan Proyek

> Jalankan perintah di dua terminal terpisah:

**Terminal 1 – Backend**
```bash
node src/server.js
```

**Terminal 2 – Frontend**
```bash
npm start
```

---

## 🗄️ Database Setup

1. Buka **XAMPP** atau **MySQL local server** Anda.
2. Buat database baru dengan nama: `watchin_db`.
3. Import file SQL berikut ke database tersebut:

```
database/migration/database.sql
```

### Cara import via command line:
```bash
mysql -u root -p watchin_db < database/migration/database.sql
```

---

## 📁 Struktur Direktori

```
watchin/
├── src/                # Backend source code
├── public/             # Static assets (frontend output)
├── database/
│   └── migration/
│       └── database.sql
├── tailwind.config.js
├── webpack.config.js
├── package.json
└── README.md
```

---

## 📌 Catatan

- Pastikan Node.js dan npm sudah terinstall di perangkat Anda.
- Jangan lupa untuk memastikan MySQL/XAMPP aktif sebelum menjalankan backend.
- File `database.sql` hanya menyediakan struktur dan data awal, sesuaikan sesuai kebutuhan aplikasi Anda.

---

## 📬 Kontribusi

Kontribusi sangat terbuka! Silakan fork repo ini dan buat pull request untuk perbaikan atau penambahan fitur.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
 
