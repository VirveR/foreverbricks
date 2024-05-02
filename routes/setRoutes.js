const express = require('express');
const router = express.Router();

const controller = require('../controllers/setController');

// GET /sets (get sets page)
router.get('/sets', controller.getSets);

// GET /sets/:number (get set by number)
router.get('/sets/:number', controller.getSetNumber);

// POST /sets/addsettocoll (add set to collection in db)
router.post('/sets/addsettocoll', controller.addSetToColl);

// POST /sets/removesetfromcoll (remove set from collection in db)
router.post('/sets/removesetfromcoll', controller.removeSetFromColl);

module.exports = router;