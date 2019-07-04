const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')

const db = require('./db')
var app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

var hostname = 'localhost'; 
var port = process.env.PORT || 3000; 

var router = express.Router(); 

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Application routes
router.route('/').get((req, res) => {
    res.render('home')
})
router.route('/game/:token').get(require('./routes/game'))
router.route('/game/:token/admin').get(require('./routes/game'))
router.route('/game/:token/spy').get(require('./routes/game'))

// A changer
app.post("/", (req, res) => {
    switch (req.body.perso) {
        case "admin":
            if (req.body.token !== '') {
                res.redirect('/game/'+ req.body.token +'/admin')
            } else {
                res.redirect('/create')
            }
            break;
        case "spy":
            res.redirect('/game/'+ req.body.token +'/spy')
            break;
        case "agent":
            res.redirect('/game/'+ req.body.token)
            break;
        default:
            break;
    }
    // res.render('home')
})
 
// API routes
router.route('/create').get(require('./routes/create'))

app.use(router)
app.set('view engine', 'pug')

// Socket
io.on('connection', function(socket) {

    socket.on('begin', function (room) {
        socket.join(room)
    })

    socket.on('update game', function(data){
        socket.broadcast.to(data.token).emit('update tab', data)
    })
})

db.connectDb().then(async () => {
    http.listen(port, () =>
        console.log(`App listening on port ${port}!`),
    );
});