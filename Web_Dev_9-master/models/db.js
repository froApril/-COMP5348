const mango = require('mongoose');
// mango.set('useCreateIndex', true);
mango.connect('mongodb://localhost/revision', {useNewUrlParser: true});

const db = mango.connection;
db.on('error', function callback(error) {
  console.log('Connection error'+error);
});

db.once('open', function callback() {
  console.log('connected');
});

