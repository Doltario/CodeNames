const express = require('express')
const path = require('path')

const db = require('./db')
var app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

var hostname = 'localhost'; 
var port = process.env.PORT || 3000; 

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

io.on('connection', function(socket){
    socket.on('update game', function(data){
        io.emit('update game', data)
    })
})

db.connectDb().then(async () => {
    http.listen(port, () =>
        console.log(`App listening on port ${port}!`),
    );
});