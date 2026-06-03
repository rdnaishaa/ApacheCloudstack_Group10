// controllers/trashController.js
// File ini berisi LOGIKA untuk setiap endpoint API
// Dipisah dari routes supaya kode lebih rapi dan mudah di-maintain

const Trash = require("../models/Trash");

// ---------------------------------------------------------------
// @desc    Ambil semua data log sampah
// @route   GET /api/trash
// @access  Public
// Dipanggil saat halaman Figma pertama kali load → mengisi data table
// ---------------------------------------------------------------
const getAllTrash = async (req, res) => {
  try {
    // Ambil semua data, urutkan dari yang terbaru (createdAt descending)
    const trashLogs = await Trash.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trashLogs.length,
      data: trashLogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error saat mengambil data",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------------
// @desc    Buat log sampah baru
// @route   POST /api/trash
// @access  Public
// Dipanggil saat user klik tombol "Submit Log" di form Figma
// ---------------------------------------------------------------
const createTrash = async (req, res) => {
  try {
    const { name, type, weight } = req.body;

    // Buat dokumen baru di MongoDB
    const newTrash = await Trash.create({ name, type, weight });

    res.status(201).json({
      success: true,
      message: "Log sampah berhasil disimpan",
      data: newTrash,
    });
  } catch (error) {
    // Tangkap error validasi Mongoose (misal: field kosong, enum salah)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error saat menyimpan data",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------------
// @desc    Hapus log sampah berdasarkan ID
// @route   DELETE /api/trash/:id
// @access  Public
// Dipanggil saat user klik ikon "Delete" di baris tabel Figma
// ---------------------------------------------------------------
const deleteTrash = async (req, res) => {
  try {
    const trash = await Trash.findById(req.params.id);

    // Kalau ID tidak ditemukan di database
    if (!trash) {
      return res.status(404).json({
        success: false,
        message: `Data dengan ID ${req.params.id} tidak ditemukan`,
      });
    }

    await trash.deleteOne();

    res.status(200).json({
      success: true,
      message: "Log sampah berhasil dihapus",
      deletedId: req.params.id,
    });
  } catch (error) {
    // Tangkap error kalau format ID tidak valid (bukan MongoDB ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Format ID tidak valid",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error saat menghapus data",
      error: error.message,
    });
  }
};

module.exports = { getAllTrash, createTrash, deleteTrash };
