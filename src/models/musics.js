const mongoose = require('../database')

const MusicSchema = new mongoose.Schema({
    name: String,
    url: String,
    DtAdd: {
        type: Date,
        default: Date.now,
    }
})

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;