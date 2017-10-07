var mongoose = require('mongoose');

var connection = 'mongodb://sidahmed:11092000@ds151279.mlab.com:51279/sart';

mongoose.connect(connection, function(err, success){
  if(err) throw err;
  if(success){
    console.log('Connected to mongodb');
  }
});
