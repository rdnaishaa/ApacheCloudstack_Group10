// server.js
// Ini adalah titik masuk utama (entry point) aplikasi
// Semua konfigurasi global, middleware, dan routes didaftarkan di sini

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Muat environment variables dari file .env SEBELUM hal lain apapun
dotenv.config();

// Jalankan koneksi ke MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────
// Izinkan semua domain untuk akses API ini (CORS)
// Penting agar frontend Figma/React bisa hit endpoint ini
app.use(cors());

// Parsing JSON — supaya req.body bisa dibaca dari request POST
app.use(express.json());

// Parsing URL-encoded form data (bonus, buat form HTML biasa)
app.use(express.urlencoded({ extended: false }));

// ── Routes ─────────────────────────────────────────────────────
// Semua endpoint trash ada di prefix /api/trash
app.use("/api/trash", require("./routes/trashRoutes"));

// Route catch-all — kalau URL tidak cocok dengan route manapun
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

// ── Start Server ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
