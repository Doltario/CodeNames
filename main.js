const express = require('express')
const path = require('path')

const db = require('./db');

var hostname = 'localhost'; 
var port = process.env.PORT || 3000; 
 
var app = express(); 

var router = express.Router(); 

// Application routes
router.route('/game').get(require('./routes/game'))
 
// API routes
router.route('/create').get(require('./routes/create'))

app.use(router)
app.use(express.static('public'))
app.set('view engine', 'pug')

db.connectDb().then(async () => {
    app.listen(port, () =>
        console.log(`App listening on port ${port}!`),
    );
});