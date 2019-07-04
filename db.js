const mongoose = require('mongoose')

var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeName'

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL || mongoDB, { useNewUrlParser: true });
}

var Schema = mongoose.Schema

var gameModelSchema = new Schema({
    token: Number,
    grid: [ { color: String, word: String } ],
    visible: [Number]
})

var Game = mongoose.model('Game', gameModelSchema)

const models = { Game };

module.exports = {
    connectDb: connectDb,
    models: models
}