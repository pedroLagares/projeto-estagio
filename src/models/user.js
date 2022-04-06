const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    DtCreate: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', UserSchema); //passa o Nome que será atribuído a essa model e o schema dele

module.exports = User;