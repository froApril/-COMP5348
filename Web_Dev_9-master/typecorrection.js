var file = cat('Dataset_25_March_2019/admin_active.txt');
var users = file.split('\n');
for(var i = 0; i < users.length; i++) {
  db.revisions.updateMany({'user':users[i]}, {$set: {'usertype':'admin'}});
}

file = cat('Dataset_25_March_2019/admin_former.txt');
users = file.split('\n');
for(var i = 0; i < users.length; i++) {
  db.revisions.updateMany({'user':users[i]}, {$set: {'usertype':'admin'}});
}

file = cat('Dataset_25_March_2019/admin_inactive.txt');
users = file.split('\n');
for(var i = 0; i < users.length; i++) {
  db.revisions.updateMany({'user':users[i]}, {$set: {'usertype':'admin'}});
}

file = cat('Dataset_25_March_2019/admin_semi_active.txt');
users = file.split('\n');
for(var i = 0; i < users.length; i++) {
  db.revisions.updateMany({'user':users[i]}, {$set: {'usertype':'admin'}});
}

file = cat('Dataset_25_March_2019/bot.txt');
users = file.split('\n');
for(var i = 0; i < users.length; i++) {
  db.revisions.updateMany({'user':users[i]}, {$set: {'usertype':'bot'}});
}