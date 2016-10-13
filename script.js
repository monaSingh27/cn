
// angular routing

var app = angular.module("myApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
    .when("#/register", {
        templateUrl : "register.html",
         controller : "registerCtrl"
    })
     .when("#/login", {
        templateUrl : "login.html",
         controller : "loginCtrl"
    })
        
});


// Register controller
    
app.controller("registerCtrl", function ($scope) {       
         
    console.log("i am in registration page");       
     });


//Login controller

app.controller("loginCtrl", function ($scope) {       
         
        console.log("i am in login page........and i donot know how can handle it");   
     });



