var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  token: String,
  reference: String,
  visits: Number
});

module.exports = mongoose.model('Url', UrlSchema);
