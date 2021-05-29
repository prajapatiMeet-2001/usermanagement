var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.use(express.json());
var User = require('../schema/users');

const signin = (req, res) => 
{
    console.log(req.body)
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
    
        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token, user:user});
        
      });
};
const signup =  (req, res) => 
{
    
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        city: req.body.city,
        dob: req.body.dob,
        fname: req.body.fname,
        email:req.body.email,
        lname: req.body.lname,
        phone: req.body.phone,
        pincode: req.body.pincode,
        state: req.body.state,
        password : hashedPassword
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
}
const signout = (req, res) =>
{
    res.status(200).send({ auth: false, token: null });
}
const checkauth = (req, res) => 
{
    var token = req.params.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      else
      {
        User.findById(decoded.id, (err, user) =>{
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            Object.assign(decoded, user._doc)
            res.status(200).send(decoded);  
          });    
      } 
    }); 
}
const getusers = (req,res) => 
{
    User.find({},(err,data)=> 
    {
        if (err) return res.status(500).send('Error on the server.');

        res.status(200).send(data);
    })
}
const updatedata = (req,res) =>
{
    var data = req.body
    User.updateOne({ _id: req.body._id }, data, function (err, data) {
        if (err) return handleError(err);
        // saved!
        res.status(200).send(data);   
      }); 
}
module.exports= {
    signin,
    signout,
    signup,
    checkauth,
    getusers,
    updatedata,
};




