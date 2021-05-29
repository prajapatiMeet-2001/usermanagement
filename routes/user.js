const express = require('express'); 
const router  = express.Router(); 
const userController = require('../controller/userController.js');

router.get('/', (req, res) => {
    res.send('Hello World')
}); 
//SIGNUP
router.post('/signup', userController.signup);
//SIGNIN
router.post('/signin', userController.signin); 
//SIGNOUT
router.post('/signout',userController.signout);
//CHECKAUTH
router.get('/checkauth/:token', userController.checkauth);
//GET USERS
router.get('/getusers',userController.getusers)
//edit data
router.put('/updatedata',userController.updatedata)
module.exports = router; // export to use in server.js