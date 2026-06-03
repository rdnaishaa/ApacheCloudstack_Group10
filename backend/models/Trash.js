// models/Trash.js
// Ini adalah "cetak biru" (blueprint) data yang disimpan ke MongoDB
// Setiap dokumen di collection "trashes" harus punya field berikut

const mongoose = require("mongoose");

const trashSchema = new mongoose.Schema({
  // Nama warga yang submit log
  name: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true,
  },

  // Jenis sampah — hanya boleh salah satu dari 4 pilihan ini
  type: {
    type: String,
    required: [true, "Jenis sampah wajib dipilih"],
    enum: {
      values: ["Plastic", "Paper", "Metal", "Cardboard"],
      message: "{VALUE} bukan jenis sampah yang valid",
    },
  },

  // Berat sampah dalam kilogram
  weight: {
    type: Number,
    required: [true, "Berat sampah wajib diisi"],
    min: [0.1, "Berat minimal 0.1 kg"],
  },

  // Waktu submit — otomatis terisi saat data dibuat
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trash", trashSchema);
