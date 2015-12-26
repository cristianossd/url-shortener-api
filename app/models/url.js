var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  token: String,
  reference: String,
  count: Number
});

module.exports = mongoose.model('Url', UrlSchema);
