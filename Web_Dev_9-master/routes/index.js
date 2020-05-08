const express = require('express');
const controller = require('../controllers/index.js');
const router = new express.Router();

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
