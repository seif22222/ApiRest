var express =require('express');
var bodyParser = require('body-parser');
var apiRouter =require('./apiROUTER').router;

// instentiation server
var server=express();


// body parser configuration
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

//  configuration des routes
server.get('/',function(eq,res){
    res.setHeader('Content-type','text/html');
    res.status(200).send('<h1>vous etre su le serveur</h1>');

});

server.use('/api/',apiRouter);
server.listen(8080,function (){
    console.log('server en ecoute');
})