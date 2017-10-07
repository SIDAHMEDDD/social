var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    user: {
        type: String
    },
    content: {
        type: String
    },
    forp: {
        type: String
    }
});

var Comment = module.exports = mongoose.model('Comment', commentSchema);