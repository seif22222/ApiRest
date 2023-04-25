var bcrypt =require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models=require('../models');
const EMAIL_REGEX=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const MDP_REGEX=/^(?=.*\d).{4,8}$/
//routes
module.exports={
    register: function(req,res){
var email =req.body.email;
var username=req.body.username;
var password=req.body.password;
var bio =req.body.bio;

if(email == null || username == null || password == null){
    return res.status(400).json({'error':'missing paamete'});
}
if(username.length>=13 || username.length<=4){
return res.status(400).json({'error':'wrong username (must be length 5-12'});
}
if(!EMAIL_REGEX.test(email)){
    return res.status(400).json({'error':'email not valid'});
}
if(!MDP_REGEX.test(password)){
    return res.status(400).json({'error':'password not valid'});
}
models.User.findOne({
    attributes:['email'],
    where:{email:email}
})
.then(function(userFound){
if(!userFound){

bcrypt.hash(password,5,function(err,bcryptedPassword){
var newuser=models.User.create({
    email:email,
    username: username,
    password:bcryptedPassword,
    bio:bio,
    isAdmin:0
})
.then(function(newuser){
    return res.status(201).json({
        'userId':newuser.id
    })
})
.catch(function(err){
    return res.status(500).json({'eroor ':'canot add user'});

});
});
}else {
    return res.status(409).json({'error':'user already exist'});
}
})
.catch(function(err){
    return res.status(500).json({'eroor ':'unable te verifi user'});

});
    },
    login:function(req,res){
var email =req.body.email;
var password = req.body.password; 
console.log(email)
console.log(password)
if(email==null || password==null){
    return res.status(400).json({'error':'missing parameters'});
}
   models.User.findOne({
    attributes:['email','password'],
    where:{email:email}

   })
   .then(function(userFound){
if (userFound){
    console.log(email)
    bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
        if(resBycrypt){
            return res.status(200).json({
                'userId':userFound.id,
                'token':jwtUtils.generateTokenForUser(userFound)
            });
        }else {
            return res.status(403).json({"error":"invalid password"});
        }
    });
}else{
    return res.status(404).json({'erro':'user not exist in DB'});
}
   })
   .catch(function(err){
    return res.status(500).json({'error':'unable to verify user'});

   });
}
}




