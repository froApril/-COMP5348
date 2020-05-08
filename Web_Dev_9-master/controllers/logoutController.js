
exports.logout = function(req, res, next) {
    req.session.destroy();
    res.render('index',{title: 'WikiLyse',flag:0});
   
  };
  