const mango = require('mongoose');
mango.connect('mongodb://localhost/revision', {useNewUrlParser: true});
const revisions = require('../../models/revision');
const fs = require('fs');
const folder = '/Users/XUYIFEI/Desktop/Web_Dev_9/Dataset_25_March_2019/revisions';
fs.readdir(folder, (err, files)=>{
    console.log("importing");
    files.forEach((file) =>{
      var filepath = folder+'/'+file;
      fs.readFile(filepath, function(err, data) {
        if (err) {
          return console.error(err);
        }
        let rev = data.toString();
        rev =JSON.parse(rev);
        for(var i=0;i< rev.length;i++){
            var revid = rev[i].revid;
            var parentid =rev[i].parentid;
            var minor =rev[i].minor;
            var user = rev[i].user;
            var userid = rev[i].userid;
            var timestamp =rev[i].timestamp;
            var size = rev[i].size;
            var sha1 = rev[i].sha1;
            var parsedcomment = rev[i].parsedcomment;
            var title = rev[i].title;
            
            var revision = {
                revid :revid,
                parentid:parentid,
                minor:minor, 
                user:user,
                userid:userid,
                timestamp:timestamp,
                size:size,
                sha1:sha1,
                parsedcomment:parsedcomment,
                title:title
              }
              // revisions.create(revision,function(err,data){
              //   console.log("123");
                
              // })
              revisions.create(revision,function(err,data){
                if(err){
                  console.log(err);
                }
              })
        }
    })
    console.log(file+" will be imported");
    });
  });
  console.log("Finish");