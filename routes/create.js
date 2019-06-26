const words = require('../words.json')
const db = require('../db');

module.exports = (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    var allWords = [],
        length = words.length
    
    for (let index = 0; index < 25; index++) {
        allWords.push(words[Math.trunc(Math.random() * (length - 0) + 0)]); 
    }

    var game = new db.models.Game({
        token: 27487,
        words: allWords
    })
    
    game.save()

    res.json({words : allWords});
    
}