var express = require('express');
var usercontrolleur=require('./routes/userControlleurs');

exports.router=(function(){
    var apiRouter=express.Router();

    //users routes
    apiRouter.route('/user/register/').post(usercontrolleur.register);
    apiRouter.route('/user/login/').post(usercontrolleur.login);
    return apiRouter;
})();