var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {type: String, required: true},
  subject: {type: String},
  text: {type: String, required: true},
  sender: {type: Schema.Types.ObjectId, ref: 'Contact', required: true}
});

module.exports = mongoose.model('Message', schema);
