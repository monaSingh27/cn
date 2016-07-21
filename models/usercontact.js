var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contact= new Schema({
 	   name    : String,
 	    email    : String,
 	    mobile  : Number,
 	    contacts:[{
 	    	name: String,
 	    	email:String,
 	    	mobile:String
 	    }]
 	});

module.exports=mongoose.model('usercontact',contact)
