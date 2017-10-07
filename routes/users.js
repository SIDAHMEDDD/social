var express = require('express');
var router = express.Router();
var authentication = require('../lib/userLib.js');
var User = require('../models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.initialize();
passport.session();

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err
   	if(!user){
   		return done(null, false, {message: 'Unknown User'})
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err
   		if(isMatch){
   			return done(null, user)
   		} else {
   			return done(null, false, {message: 'Invalid password'})
   		}
   	})
   })
  }))

router.get('/login', authentication.ensureLoggedin, function(req, res, next){
  res.render('login', { title: 'Login', layout: 'login'});
});
router.get('/register', authentication.ensureLoggedin, function(req, res, next){
  res.render('register', { title: 'Register', layout: 'register'});
});
router.post('/createuser', (req, res) => {
  var uname = req.body.username;
  var em = req.body.email;
  var pass = req.body.password;
  var psw = req.body.passwordcnf;
  var cnt = req.body.country;
  var cty = req.body.city;
  var pcode = req.body.postalcode;


  var newUser = new User({
    username: uname,
    email: em,
    password: pass,
    country: cnt,
    city: cty,
    postalcode: pcode
  });
  User.createUser(newUser, (err, user) => {
    if(err) throw err
    console.log(User);
    res.render('login', { title: 'Login'});
  });
});
router.post('/authenticate',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'}),
  function(req, res) {
    console.log(req.user.username);
    res.render('index', { utype: req.user.userType});
});
router.get('/logout', function(req, res){
	req.logout();

	res.redirect('/');
});

module.exports = router;
