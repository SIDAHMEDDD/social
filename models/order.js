var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
  from: {
    type: String
  },
  type: {
    type: String
  },
  email: {
    type: String
  },
  plan: {
    type: String
  },
  description: {
    type: String
  }
});

var Order = module.exports = mongoose.model('Order', OrderSchema);
