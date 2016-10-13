    var express  = require('express');
    var app      = express();                              
    var mongoose = require('mongoose');   
    var routes = require('./Routes/routes');
    var bodyparser = require('body-parser');

     var cookieParser = require('cookie-parser');
     app.use(cookieParser());


     app.use(bodyparser.json());
     app.use(bodyparser.urlencoded({ extended: true }));

    mongoose.connect('mongodb://localhost/contactmanager',function(err,data){
        if(err){
            console.log('database connection error'+err); }
            else {
                console.log('database connection successful'); }
       });


    // app.use(function(req, res, next) {

    //   var token = req.cookies.token;

    //   // decode token
    //   if (token) {

    //     jwt.verify(token, 'secret', function(err, token_data) {
    //       if (err) {
    //          return res.status(403).send('Error');
    //       } else {
    //         req.user_data = token_data;
    //         next();
    //       }
    //     });

    //   } else {
    //     return res.status(403).send('No token');
    //   }
    // });
   

     app.use(routes);
     app.use(express.static(__dirname + '/public'));

    app.listen(5000);
    console.log("App listening on port 5000");