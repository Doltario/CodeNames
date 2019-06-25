const express = require('express')
const words = require("an-array-of-french-words")
 
var hostname = 'localhost'; 
var port = 3000; 
 
var app = express(); 

var app = express(); 

var router = express.Router(); 
 
router.route('/words').get( function( req, res ) { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    var allWords = [],
        length = words.length
    
    for (let index = 0; index < 25; index++) {
        allWords.push(words[Math.trunc(Math.random() * (length - 0) + 0)]); 
    }
	res.json({words : allWords});
})

app.use(router)

app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});