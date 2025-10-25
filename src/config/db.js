const mysql = require('mysql2');
require('dotenv').config(); // Pastikan .env ter-load dengan benar

const pool = mysql.createPool({
    connectionLimit: 10,
       host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'data_Siswa',
     dateStrings:true
});

// Cek koneksi database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Gagal terhubung ke database MySQL', err.message);
        return; // Jangan throw agar server tetap berjalan
    }
    console.log('Terhubung ke MySQL (pool) - siap menerima query');
    connection.release(); // Kembalikan koneksi ke pool
});

module.exports = pool;
