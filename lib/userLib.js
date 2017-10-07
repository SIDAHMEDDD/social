module.exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/users/login')
}
module.exports.ensureLoggedin = function(req, res, next) {
  if (req.isAuthenticated() === false) { return next(); }
  res.redirect('/');
}
module.exports.ensureAuthenticated_admin = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
module.exports.ensureAdmin = function(req, res, next) {
  if (req.user.userType === "admin") { return next(); }else{
    res.redirect('/');
  }
}
module.exports.findUser = function(uname, callback) {
  user.find({_id: uname}, function(err, userr) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, userr);
    }
  });
};
