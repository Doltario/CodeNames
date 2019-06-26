const express = require('express')
const words = require("./words.json")
const path = require("path")
 
var hostname = process.env.DOMAIN_NAME || 'localhost'; 
var port = process.env.PORT || 3000; 
 
var app = express(); 

var router = express.Router(); 

// Application routes
router.route('/').get( function( req, res ) { 
    res.sendFile(path.join(__dirname + '/index.html'));
})
 
// API routes
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
app.use(express.static('public'))

app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});