const db = require('../db')

module.exports = async (req, res) => {

    // var token = 27487
    var token = req.params.token
    await db.models.Game.findOne({ token: token }, function (err, game) {
        if (err) return handleError(err)

        res.render('game', { game: game })
    });
}