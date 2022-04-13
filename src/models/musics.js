const mongoose = require('../database')

const MusicSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    url: String,
    DtAdd: {
        type: Date,
        default: Date.now,
    }
    
})

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;