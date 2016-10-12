'use strict';

var express =require('express');
var crypto =require('crypto');
var client =require('mongodb').MongoClient;

var app = express();

var algorithm ='aes256',password = 'asaadsaad';


var encMessage;

client.connect('mongodb://localhost:27017/lab7db',function(err,db){

    if(err) throw err;
    
    //Insert the encrypted message to mongodb
      db.collection('lab1').insert({message: "ba12e76147f0f251b3a2975f7acaf446a86be1b4e2a67a5d51d62f7bfbed5c03"});
      console.log('doc inserted.');

    //Find the message in mongodb
    db.collection('lab1').findOne({},function(err,doc){
        if(err) throw err;
        encMessage=doc.message;   
        console.log(encMessage);

     });

    db.close();
});

//decrypt the message and send it to a browser
app.get('/',function(req,res){

  var decipher = crypto.createDecipher(algorithm,password);
  var decrMessage = decipher.update(encMessage,'hex','utf8');
  decrMessage += decipher.final('utf8');

  res.send(decrMessage);

});

app.listen(4000,()=>{
    console.log('Server Listening at 4000');
});
