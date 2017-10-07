var express = require('express');
var router = express.Router();
var authentication = require('../lib/userLib.js');
var dateTime = require('../lib/dateTime.js');
var Template = require('../models/template');

var isAuthenticated = authentication.ensureAuthenticated;

var Comment            = require('../models/comment');

router.get('/', function(req, res, next){
  var date = dateTime.getDate;
  Template.find({}, function(err, alltemp){
      Template.find({}, function(err, templates){
          res.render('index', { layout: 'index', currentDate: date, class1: 'active'
              , templatesL: templates, title: 'Home', templates: alltemp});
      }).limit(5);
  });
});
router.get('/about', function(req, res, next){
  res.render('about', { title: 'About', class4: 'active'});
});

router.post('/comment', isAuthenticated, function(req, res){
    var user = "sidahmed";
    var content = req.body.content;
    var postid = req.body.postid;

    var newComment = new Comment({
        user: user,
        content: content,
        forp: postid
    });

    newComment.save();

    res.redirect('/');
});


module.exports = router;
