var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  maxContactId: {type: Number},
  maxMessageId: {type: Number},
  maxDocumentId: {type: Number}
});

module.exports = mongoose.model('Sequence', schema);
