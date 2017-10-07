var express = require('express');
var router = express.Router();
var authentication = require('../lib/userLib.js');
var User = require('../models/user');
var Template = require('../models/template');
var Order = require('../models/order');

router.get('/main', authentication.ensureAuthenticated_admin,
                    authentication.ensureAdmin,
                    function(req, res){
  res.render('dashboard/main', { title: 'Main Dashboard', class1: 'active', layout: 'dashboard'});
})
router.get('/clients', authentication.ensureAuthenticated_admin,
                    authentication.ensureAdmin,
                    function(req, res){
                      User.find({}, function(err, docs){
                        res.render('dashboard/clients', { title: 'Clients', class2: 'active', users: docs,layout: 'dashboard'});
                      });
})
router.get('/products', authentication.ensureAuthenticated_admin,
                    authentication.ensureAdmin,
                    function(req, res){
                      Template.find({}, function(err, docs){
                        res.render('dashboard/products', { title: 'Products', class3: 'active', products: docs, layout: 'dashboard'});
                      })
})
router.get('/posts', authentication.ensureAuthenticated_admin,
    authentication.ensureAdmin,
    function(req, res){
        Template.find({}, function(err, docs){
            res.render('dashboard/products', { title: 'Products', class4: 'active', products: docs, layout: 'dashboard'});
        })
    })
router.get('/orders', authentication.ensureAuthenticated_admin,
                    authentication.ensureAdmin,
                    function(req, res){
                      Order.find({}, function(err, docs){
                        res.render('dashboard/orders', { title: 'Orders', class4: 'active', orders: docs, layout: 'dashboard'});
                      })
})
router.get('/overview', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
  res.render('dashboard/overview', { title: 'Overview', class6: 'active', layout: 'dashboard'})
})
router.get('/admins', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
                User.find({userType: "admin"}, function(err, docs){
                  res.render('dashboard/admins', { title: 'Administrators', class7: 'active', admins: docs, layout: 'dashboard'})
                })
})
router.get('/remove/:id', authentication.ensureAuthenticated_admin,
    authentication.ensureAdmin,
    function(req, res){
        User.find({userType: "admin"}, function(err, docs){
            res.render('dashboard/admins', { title: 'Administrators', class7: 'active', admins: docs, layout: 'dashboard'})
        })
    })
router.get('/webdesigners', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
                User.find({userType: "designer"}, function(err, docs){
                  res.render('dashboard/webdesigners', { title: 'Web Designers', class8: 'active', designers: docs, layout: 'dashboard'})
                })
})
router.get('/upload', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
  res.render('dashboard/upload', { title: 'Upload', class9: 'active', layout: 'dashboard'})
})
router.get('/layout', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
  res.render('dashboard/wlayout', { title: 'Layout', class10: 'active', layout: 'dashboard'})
})
router.post('/upload', authentication.ensureAuthenticated_admin,
              authentication.ensureAdmin,
              function(req, res){
  var name = req.body.name;
  console.log(name);
  res.render('dashboard/upload', { title: 'Upload', class9: 'active', layout: 'dashboard'})
})

module.exports = router;
