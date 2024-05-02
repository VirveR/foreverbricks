const express = require('express');
const router = express.Router();

const controller = require('../controllers/partController');

// GET /parts (get parts page)
router.get('/parts', controller.getParts);

// GET /parts/:number (get a part by number)
router.get('/parts/:number', controller.getPartNumber);

module.exports = router;