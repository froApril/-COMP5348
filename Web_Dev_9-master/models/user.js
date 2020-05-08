const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  secondname: String,
  username: String,
  password: String,

});

// methods here

module.exports = mongoose.model('user', userSchema);
