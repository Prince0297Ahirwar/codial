const express = require('express');
const homeController = require('../controllers/home_controller');

const router  = express.Router();

router.get('/',homeController.home);

router.use('/users',require('./users'));


//for any other further routes 
//router.use('/routername',require('./router'));
module.exports = router;
//checking if router loaded

//console.log("router loaded")