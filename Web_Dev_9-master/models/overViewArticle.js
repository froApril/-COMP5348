const mongoose = require('mongoose');

const overViewSchema = new mongoose.Schema({
  revisionNum: Number,
  title: String,
  history: Date,
  registeredNum: Number,
});

module.exports = mongoose.model('overView', overViewSchema);
