var express  = require('express');
 var app      = express();                               
 var mongoose = require('mongoose');
 var router = express.Router();
 var jwt    = require('jsonwebtoken');
 var login = require('../models/login');
 var contact = require('../models/usercontact');


var cookieParser = require('cookie-parser')
app.use(cookieParser())


 
app.get('/login', function(req, res, next) {

  login.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json('user not found');
    } else if (user) {
      if (user.password != req.body.password) {
        res.json('Wrong password.');
      } else {


    var token = jwt.sign(user, 'secret', {
            expiresIn: 1440
          });

    res.cookie('auth',token);
    res.send('ok');
}

app.use(function(req, res, next) {

  var token = req.cookies.auth;

  // decode token
  if (token) {

    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) {
         return res.status(403).send('Error');
      } else {
        req.user_data = token_data;
        next();
      }
    });

  } else {
    return res.status(403).send('No token');
  }
});

app.listen(5000);
console.log("App listening on port 5000");