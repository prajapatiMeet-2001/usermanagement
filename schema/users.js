var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  city: {type:String,required:true},
  email: {type:String,required:true},
  dob: {type:Date,required:true},
  fname: {type:String,required:true},
  lname: {type:String,required:true},
  phone: {type:String,required:true,unique : true},
  password: {type:String,required:true},
  pincode: {type:Number,required:true},
  state: {type:String,required:true},
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');