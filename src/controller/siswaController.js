// backend/controllers/siswaController.js
const pool = require('../config/db');

// CREATE SISWA (Tambah Data)
exports.createSiswa = (req, res) => {
  const { nama, alamat, tgl_Siswa, jurusan } = req.body;
  // tgl_Siswa diasumsikan sudah dalam format 'YYYY-MM-DD' dari frontend

  pool.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({ error: 'DB Connection error', detail: err.message });
    }

    const sqlInsert = 'INSERT INTO siswa (nama, alamat, tgl_Siswa, jurusan) VALUES (?, ?, ?, ?)';
    conn.query(sqlInsert, [nama, alamat, tgl_Siswa, jurusan], (errInsert, result) => {
      conn.release();
      if (errInsert) {
        return res.status(500).json({ error: 'DB insert error', detail: errInsert.message });
      }

      const newId = result.insertId;
      const sqlSelect = 'SELECT * FROM siswa WHERE id = ?';
      pool.query(sqlSelect, [newId], (errSelect, rows) => {
        if (errSelect) return res.status(500).json({ error: 'DB select error', detail: errSelect.message });
        res.status(201).json(rows[0]);
      });
    });
  });
};

// READ ALL (Tampilkan Semua Data)
exports.getAllSiswa = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      return res.status(500).json({ error: 'DB Connection error', detail: err.message });
    }

    const sql = 'SELECT * FROM siswa ORDER BY id DESC';
    conn.query(sql, (errQuery, rows) => {
      conn.release();
      if (errQuery)
        return res.status(500).json({ error: 'DB query error', detail: errQuery.message });
      res.json(rows);
    });
  });
};

// READ BY ID (Tampilkan Data Berdasarkan ID)
exports.getSiswaById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid' });

  pool.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'DB connection error', detail: err.message });

    const sql = 'SELECT * FROM siswa WHERE id = ?';
    conn.query(sql, [id], (errQuery, rows) => {
      conn.release();
      if (errQuery)
        return res.status(500).json({ error: 'DB query error', detail: errQuery.message });
      if (rows.length === 0)
        return res.status(404).json({ error: 'Siswa tidak ditemukan' });
      res.json(rows[0]);
    });
  });
};

// UPDATE (Edit Data)
exports.updateSiswa = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nama, alamat, tgl_Siswa, jurusan } = req.body;
  if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid' });

  pool.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'DB connection error', detail: err.message });

    const sqlUpdate =
      'UPDATE siswa SET nama = ?, alamat = ?, tgl_Siswa = ?, jurusan = ? WHERE id = ?';
    conn.query(sqlUpdate, [nama, alamat, tgl_Siswa, jurusan, id], (errUpdate, result) => {
      if (errUpdate) {
        conn.release();
        return res.status(500).json({ error: 'DB update error', detail: errUpdate.message });
      }

      if (result.affectedRows === 0) {
        conn.release();
        return res.status(404).json({ error: 'Siswa tidak ditemukan' });
      }

      const sqlSelect = 'SELECT * FROM siswa WHERE id = ?';
      conn.query(sqlSelect, [id], (errSelect, rows) => {
        conn.release();
        if (errSelect)
          return res.status(500).json({ error: 'DB select error', detail: errSelect.message });
        res.json(rows[0]);
      });
    });
  });
};

// DELETE (Hapus Data)
exports.deleteSiswa = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid' });

  pool.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'DB connection error', detail: err.message });

    const sql = 'DELETE FROM siswa WHERE id = ?';
    conn.query(sql, [id], (errDel, result) => {
      conn.release();
      if (errDel)
        return res.status(500).json({ error: 'DB delete error', detail: errDel.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Siswa tidak ditemukan' });
      res.json({ message: 'Siswa berhasil dihapus' });
    });
  });
};