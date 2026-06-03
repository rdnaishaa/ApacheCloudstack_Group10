// routes/trashRoutes.js
// File ini hanya mendaftarkan URL path dan menghubungkannya ke controller
// Logika bisnis TIDAK ditulis di sini

const express = require("express");
const router = express.Router();
const {
  getAllTrash,
  createTrash,
  deleteTrash,
} = require("../controllers/trashController");

// GET    /api/trash       → Ambil semua data (untuk isi tabel di Figma)
// POST   /api/trash       → Simpan data baru (tombol Submit Log)
router.route("/").get(getAllTrash).post(createTrash);

// DELETE /api/trash/:id   → Hapus 1 baris berdasarkan ID (tombol Delete di tabel)
router.route("/:id").delete(deleteTrash);

module.exports = router;
