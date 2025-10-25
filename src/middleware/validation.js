// backend/middleware/validation.js
module.exports = function validateSiswa(req, res, next) {
  const { nama, alamat, tgl_Siswa, jurusan } = req.body;

  if (!nama || nama.toString().trim() === '') {
    return res.status(400).json({ error: 'Nama harus diisi' });
  }

  if (!alamat || alamat.toString().trim() === '') {
    return res.status(400).json({ error: 'Alamat harus diisi' });
  }

  if (!tgl_Siswa || tgl_Siswa.toString().trim() === '') {
    return res.status(400).json({ error: 'Tanggal Lahir Siswa harus diisi' });
  }

  if (!jurusan || jurusan.toString().trim() === '') {
    return res.status(400).json({ error: 'Jurusan harus diisi' });
  }

  // semua lolos
  next();
};