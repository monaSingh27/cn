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
            // res.cookie('token',req.headers.token);

           login.update( { email: req.body.email },  { $set: { token: token }},function(err,loginuser){
                 if(err){
                  console.log(err);}
                 else{
                  console.log(loginuser)}

           })  

              // res.cookie('auth',token);
              // res.send('ok');
              
           //  contact.update( { email: req.body.email },  { $set: { token: token }},function(err,cuser){
           //       if(err){
           //        console.log(err);}
           //       else{
           //        console.log(cuser)}

           // })         
            }   
           }
       });
     });

     // route middleware that will happen on every request
     router.use(function(req, res, next) {

         // log each request to the console
         console.log(req.method, req.url);
         //save cookie
         res.cookie('token',req.headers.token,{expires: new Date(Date.now() + 2000) });
         //res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

         // continue doing what we were doing and go to the route
         next(); 
     });


     router.route('/user').post(function(req,res) {
         login.findOne({token:req.headers.token}, function(err, user) {
           if (err){
            console.log(err);
             res.json(err);
           }
      else if(user===null||undefined||""){
           res.json("unauthroized");}

           else{
            //  res.cookie('token',req.headers.token);
            res.json(user);

           }
         });
       });

     

     router.route('/addcontact').post(function(req,res) {

      login.findOne({token:req.headers.token}, function(err, user) {
           if (err){
            console.log(err);
             res.json(err);
           }
      else if(user===null||undefined||""){
           res.json("unauthroized");}

           else{
            console.log(user);

           //  var ucontact = new contact({
           //  name:req.body.name,
           // email:req.body.email,
           //  mobile:req.body.mobile    });
           var contacts=new contact();
           contacts.name=req.body.name;
           contacts.email=req.body.email;
           contacts.mobile=req.body.mobile;

// contact.update( {email:user.email}, { $push:{"contacts":{ "name": name, "email":email,"mobile":mobile }} },function(err,data){

          contact.update( {email:user.email}, { $push:{"contacts":{ "name": contacts.name, "email":contacts.email,"mobile":contacts.mobile }} },function(err,data){
       if(err) {
              console.log(err);
              res.json(err);  
               }
          else {
            res.json(data);
          console.log(data);  }

     });  
   }

         });
});


          router.route('/viewcontact').get(function(req,res) {

           login.findOne({token:req.headers.token}, function(err, user) {
                if (err){
                 console.log(err);
                  res.json(err);
                }
           else if(user===null||undefined||""){
                res.json("unauthroized");}

                else{
                 console.log(user);

                 //db.coll.find({"auther" : "xyz" , "books.book1" : "b1"} , {"books.date" : 1})
               //  db.usercontacts.findOne( {email:"kumar"},{"contacts.name":1,"contacts.email":1,"contacts.mobile":1})

              contact.findOne( {email:user.email},{"contacts.name":1,"contacts.email":1,"contacts.mobile":1},function(err,data){
            if(err) {
                   console.log(err);
                   res.json(err);  
                    }
               else {
                 res.json(data);
               console.log(data);  }

          });  
        }

              });
     });



          router.route('/delcontact').delete(function(req,res) {

           login.findOne({token:req.headers.token}, function(err, user) {
                if (err){
                 console.log(err);
                  res.json(err);
                }
           else if(user===null||undefined||""){
                res.json("unauthroized");}

                else{
                 console.log(user);


                 contact.update({email:user.email},{$pull:{contacts:{}}},function(err,data){

              // contact.findOne( {email:user.email}
              //,function(err,data){
            if(err) {
                   console.log(err);
                   res.json(err);  
                    }
               else {
                 res.json(data);
               console.log(data);  }

          });  
        }

              });
     });
      


  

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