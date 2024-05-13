const express = require('express');
const router = express.Router();

const controller = require('../controllers/partController');

// GET /api/parts (get parts page)
router.get('/api/parts', controller.getParts);

// GET /api/parts/:number (get a part by number)
router.get('/api/parts/:number', controller.getPartNumber);

module.exports = router;