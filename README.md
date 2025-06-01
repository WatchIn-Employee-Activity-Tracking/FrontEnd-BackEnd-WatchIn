Frontend
      Jenis: Vanilla JavaScript (bukan React, Vue, atau Angular)
      Bundler: Webpack (atau sejenisnya, karena ada import ES6 dan folder src/)
Struktur:
      File utama frontend: src/index.js
      View (HTML dalam bentuk template string):
      src/views/auth/login.js
      src/views/auth/register.js
      src/views/admin/dashboard.js
      src/views/employee/dashboard.js
Controller (logic):
      src/scripts/auth/authController.js
      src/scripts/auth/landingController.js
Cara kerja:
    SPA (Single Page Application) sederhana, routing menggunakan hash (window.location.hash) Menggunakan fetch API untuk komunikasi ke backend
---------------------------------------------------------------------------------------------------------------------------------------------------------
Backend
    Jenis: Node.js dengan Express
Struktur:
    File utama backend: src/server.js
API route: 
    src/api/auth.js
Koneksi database: 
    src/config/database.js
Database: 
    MySQL (dijalankan lewat XAMPP)
Fitur backend:
    API untuk login dan register (/api/auth/login, /api/auth/register)
    Menggunakan JWT untuk autentikasi
    Password di-hash dengan bcrypt
    Data user disimpan di MySQL
