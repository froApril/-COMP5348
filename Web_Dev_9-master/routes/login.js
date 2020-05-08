const express = require('express');
const router = new express.Router();
const controller =require('../controllers/loginController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user!=null){
    res.render('error', {message:"You have logged in.",flag:1,name:req.session.user.name});
  }
  return res.render('../views/login.ejs',{flag:0});
});

router.post('/', controller.login);

module.exports = router;
