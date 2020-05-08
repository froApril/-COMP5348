const express = require('express');
const controller = require('../controllers/logoutController');
const router = new express.Router();

/* GET home page. */
router.get('/', controller.logout);

module.exports = router;
