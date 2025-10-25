// backend/routes/siswaRoutes.js
const express = require('express');
const router = express.Router();

const siswaController = require('../controller/siswaController');
const validateSiswa = require('../middleware/validation');

// READ all
router.get('/', siswaController.getAllSiswa);

// READ one
router.get('/:id', siswaController.getSiswaById);

// CREATE (gunakan middleware validasi)
router.post('/', validateSiswa, siswaController.createSiswa);

// UPDATE (gunakan middleware validasi)
router.put('/:id', validateSiswa, siswaController.updateSiswa);

// DELETE
router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;