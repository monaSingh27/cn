   var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');
    var router = express.Router();
    var jwt    = require('jsonwebtoken');
    var login = require('../models/login');
    var contact = require('../models/usercontact');


//register routes
     router.route('/register')
     .post(function(req, res) {
     	
            var usercontact = new contact({
             name:req.body.name,
              email:req.body.email,
                mobile:req.body.mobile    });

            usercontact.save(function(err,data){
                if(err) {
                    console.log(err);
                    res.json(err);   }
                else {
                console.log(data); }
            });  

            	var userlogin = new login({
                    email:req.body.email,
                 password:req.body.password
                });

            	userlogin.save(function(err,data){
            		if(err) {
            			console.log(err);
            			res.json(err);   }
            		else {
            		console.log(data);   }
            	}); 
            	
            res.json("Registration done!!");
   });


     router.route('/login')
     .post(function(req, res) {

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
               var token = jwt.sign(user,'superSecret', { expiresIn: 60 }); 
             res.json({
               success: true,
               message: 'token!',
               token: token
                });
           login.update( { email: req.body.email },  { $set: { token: token }},function(err,loginuser){
                 if(err){
                 	console.log(err);}
                 else{
                 	console.log(loginuser)}

           })          
            }   
           }
       });
     });

                       // session manage using token


              router.route('/getdetails').post(function(req,res){
                login.findOne({token:req.headers['token']},function(err,user){
                  if(err){
                    res.json(err);
                  }
                  else if(user === null || undefined || ""){
                    res.json("invalid token")
                  }
                  else
                  {
                    res.json("authenticate");
                    console.log("authenticate");
                  }
                });
              });
                        //

    router.route('/del/:email').delete(function(req,res) {
        login.remove({email:req.params.email}, function(err, user) {
          if (err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
        });
      });

//       router.route('/logout').post(function(req,res) {

//       login.update( { email:email },  { $unset: { token: token }},function(err,user){

//  if(err) {
//   console.log(err);  }
//  else{
//   console.log(user);
//   res.json("successfully logout")  }
// })
//     });


              

     module.exports =router;