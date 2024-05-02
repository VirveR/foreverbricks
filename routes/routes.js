const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// GET / (get home page)
router.get('/', controller.getHome);

// POST /login (log in)
router.post('/login', controller.login);

// GET /test (get test page)
router.get('/test', controller.getTest);

// POST /test/part (add a part to db)
router.post('/test/part', controller.addPart);

// POST /test/partver (add a version to a part in db)
router.post('/test/partver', controller.addVersion);

// POST /test/set (add a set to db)
router.post('/test/set', controller.addSet);

// POST /test/addcontent (add parts to set in db)
router.post('/test/addcon', controller.addContent);

// GET /blog (get blog page)
router.get('/blog', controller.getBlog);

// GET /about (get about page)
router.get('/about', controller.getAbout);

module.exports = router;
