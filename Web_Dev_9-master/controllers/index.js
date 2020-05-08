// const jsonFileHandler = require('./jsonFileHandler');


exports.index = function(req, res, next) {
  if(req.session.user!=null){
    res.render('index', {title: 'WikiLyse',flag:1,name:req.session.user.name});
  }
  res.render('index', {title: 'WikiLyse',flag:0});

};
