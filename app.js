// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000; // Menggunakan port dari .env

require('./src/config/db'); // Pastikan koneksi DB berjalan

const siswaRoutes = require('./src/routes/siswaRoutes');

// Konfigurasi CORS
app.use(cors({
  origin: "http://localhost:5173", // Sesuaikan dengan port frontend React
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json()); // Middleware untuk parsing body JSON
app.use('/api/siswa', siswaRoutes); // Endpoint utama: /api/siswa

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

app.listen(port, () => {
  console.log(`Server terhubung dengan port ${port}`);
});