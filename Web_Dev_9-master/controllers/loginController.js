const crypto =require('crypto');
const User =require('../models/user');

exports.login = function(req, res, next) {
  const md5 =crypto.createHash('md5');
  const newPas = md5.update(req.body.password).digest('hex');
  const postData ={
    username: req.body.username,
    password: newPas,
  };
  console.log(postData.username);
  User.findOne({username: postData.username}, function(err, data) {
    if (data) {
      const user={
        name: data.firstname
      };
      req.session.user =user;
      res.render('articleAnalyze.ejs',{flag:1,name:req.session.user.name});
    } else {
      res.render('error',{message:"account or password is wrong, Please login again",flag:0});
    }
  });
};
