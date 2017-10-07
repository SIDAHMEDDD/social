var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  company: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  }
});

var Message = module.exports = mongoose.model('Message', MessageSchema);
