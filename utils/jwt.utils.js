var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET ='li6y=ruwg_6hxf8z0@bhqf!fh@7)s9jw$)$v!+-g&0=244%7_g';
module.exports={
    generateTokenForUser: function(userData){
     return jwt.sign({
        userId: userData.id,
        isAdmin: userData.isAdmin

     },
     JWT_SIGN_SECRET,
     {
        expiresIn: '1h'
     })
    }
}