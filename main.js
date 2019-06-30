const express = require('express')
const path = require('path')

const db = require('./db');

var hostname = 'localhost'; 
var port = process.env.PORT || 3000; 
 
var app = express(); 

var router = express.Router(); 

// Application routes
router.route('/game/:token').get(require('./routes/game'))
router.route('/').get((req, res) => {
    res.render('home')
})
 
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