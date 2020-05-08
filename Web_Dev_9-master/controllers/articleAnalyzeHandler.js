/* eslint-disable guard-for-in */
const revisions = require('../models/revision');
const axios = require('axios');


exports.default = function(req, res, next) {
  if(req.session.user!=null){
    res.render ('articleAnalyze.ejs', {flag:1,name:req.session.user.name});
  }
  else{
    res.render('error',{message:"Please login first.",flag:0});
  }
};

exports.setRevision_High = function(req, res, next) {
  var number = parseInt(req.body.number);
  revisions.getMostRevision(number,function(err,data){
    if(err){
      console.log(err);
    }

    var articlelist=[];
    for(var i=0;i<number;i++){
      articlelist.push(data[i]._id);
    }
    res.send({articlelist: articlelist, length: data.length});
  })
};

exports.setRevision_Low = function(req, res, next) {
  var number = parseInt(req.body.number);
  revisions.getLeastRevision(number,function(err,data){
    var articlelist=[];
    for(var i=0;i<number;i++){
      articlelist.push(data[i]._id);
    }
    res.send({articlelist: articlelist, length: data.length});
  })
};

exports.gethistory_H = function(req, res, next) {
  revisions.getMostHistory(function(err,data){
    console.log(data);
    var articlelist=[];
    for(var i=0;i<2;i++){
      articlelist.push(data[i]._id);
    }
    res.send({articlelist: articlelist});
  })
};
exports.gethistory_L = function(req, res, next) {
  revisions.getLeastHistory(function(err,data){
    var articlelist=[];
    articlelist.push(data[0]._id);
    res.send({articlelist: articlelist});
  })
};


exports.getUserNum_H = function(req, res, next) {
 revisions.getMostRegister(function(err,data){
    var articlelist=[];
    console.log(data);
    articlelist.push(data[0]._id);
    res.send({articlelist: articlelist});
 })
};

exports.getUserNum_L = function(req, res, next) {
  revisions.getLeastRegister(function(err,data){
     var articlelist=[];
     articlelist.push(data[0]._id);
     res.send({articlelist: articlelist});
  })
 };

 exports.getDistinctTitlesList = function(req, res, next) {
   revisions.getDistinctTitles(function(err,data){
     var articlelist=[];
    
     for (i = 0; i < data.length; i ++) {
       articlelist.push([data[i]._id, data[i].numOfEdits]);
     }
     
     res.send({articlelist: articlelist});
   })
 };
 
 exports.titleTotalRevisions = function(req, res, next) {
   var title = req.body.title;
   var from = req.body.from;
   var to = req.body.to;
    revisions.getTotalRevForTitle(title, from, to, function(err,data){
      if(err){
          console.log(err);
        }
        var articlelist=[];

        articlelist.push(data);
        
       res.send({articlelist: articlelist});
    })
 };

   
exports.articleTopAuthors = function(req,res,next) {
  var title = req.body.title;
  var from = req.body.from;
  var to = req.body.to;
  revisions.articleTopFiveAuthors(title, from, to, function(err,data){
    if(err){
      console.log(err);
    }
    var authorList=[];

    for (i = 0; i < data.length; i++) {
      authorList.push([data[i]._id, data[i].numOfEdits]);
    }
    res.send({authorList: authorList, length: data.length});
  })
};

exports.update = function(req, res, next) {
  let responseMessage = 0;
  const articleTitle = req.params.title;
  let timestamp = new Date();
  revisions.getMostRecentRevisionDate(articleTitle, function(err, data) {
    if (err) {
      console.log(err);
    }
    timestamp = data[0].timestamp;
  });
  const mostRecentRevisionURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=${articleTitle}&rvprop=timestamp%7Cuser%7Csha1%7Cuserid%7Csize%7Cids%7Cparsedcomment&rvlimit=500&rvstart=${timestamp.toISOString()}&rvdir=older`;
  axios.get(mostRecentRevisionURL).then((response) => {
    const json = response.data.query.pages;
    let article = {};
    for (key in json) {
      article = json[key];
    }
    const articleTimestamp = new Date(article.revisions[0].timestamp);
    if (timestamp < articleTimestamp) {
      responseMessage = 1;
      console.log('Updating: ' + articleTitle);
      const revs = article.revisions;
      for (let i = 0; i < revs.length; i++) {
        const currRevision = revs[i];
        let data = {};
        data['revid'] = currRevision.revid;
        data['parent'] = currRevision.parentid;
        data['user'] = currRevision.user;
        data['userid'] = currRevision.userid;
        data['timestamp'] = currRevision.timestamp;
        data['size'] = currRevision.size;
        data['sha1'] = currRevision.sha1;
        data['parsedcomment'] = currRevision.parsedcomment;
        data['title'] = articleTitle;
        data['usertype'] = 'user';
        if (currRevision['minor']) {
          data['minor'] = '';
        }
        if (currRevision['anon']) {
          data['anon'] = '';
        }
        const newRevision = new revisions(data);
        newRevision.save((err, rev) => {
          if (err) console.log(err.errors.message);
        });
      }
    }
  }).catch((error) => {
    console.log(error);
  }).finally(function() {
    res.send({'update': responseMessage});
  });
};
exports.userPie = function(req,res,next) {
	revisions.userTypePieChart(function(err, data) {
		
		var userCount = [];
		if(err) {
			console.log(err)
		}
		userCount.push(data[0].Unregistered);
		userCount.push(data[0].Regular);
		userCount.push(data[0].Admin);
		userCount.push(data[0].Bot);
		
		res.send({userCount: userCount});
		
	})
};

exports.individualPie = function(req,res,next) {
	  var title = req.body.title;
	  var from = req.body.from;
	  var to = req.body.to;
	  revisions.individualPieChart(title, from, to, function(err,data){
	    if(err){
	      console.log(err);
	    }
	    var userCount = [];
	    userCount.push(data[0].Unregistered);
		userCount.push(data[0].Regular);
		userCount.push(data[0].Admin);
		userCount.push(data[0].Bot);
		res.send({userCount: userCount});
	  })
	};

exports.userBar = function(req,res,next) {
	revisions.userTypeBarChart(function(err, data) {
		
		var userCount = [];
		if(err) {
			console.log(err)
		}

		userCount.push(data[0].Unregistered);
		userCount.push(data[0].Regular);
		userCount.push(data[0].Admin);
		userCount.push(data[0].Bot);
		
		res.send({userCount: userCount});
		
	})
};

exports.articleYearBar = function(req,res,next) {
	var title = req.body.title;
	var from = req.body.from;
    var to = req.body.to;
	revisions.articleUserBarChart(title, from, to, function(err,data){
		var userCount = [];
		if(err) {
			console.log(err)
		}

		userCount.push(data[0].Unregistered);
		userCount.push(data[0].Regular);
		userCount.push(data[0].Admin);
		userCount.push(data[0].Bot);
		
		res.send({userCount: userCount});
	})
}

exports.YearlyUserBar = function(req,res,next){
  var user= req.body.author;
  var title = req.body.title;
  var from = req.body.from;
  var to = req.body.to;
  revisions.userArticlesBarChart(user,title,from,to,function(err,data){
     res.send({dataset:data});
  })

  
  
}

exports.authorTitleStats = function(req, res, next) {
	
	var author = req.body.author;
	
	revisions.authorTitles(author, function(err, data) {
		if(err){
		      console.log(err);
		    }
	    var authorTitles=[];
		    for (i = 0; i < data.length; i++) {
		      authorTitles.push([data[i]._id, data[i].numOfEdits, data[i].timestamps]);
		    }
		    
		    res.send({authorTitles: authorTitles, length: data.length});
	})
}



