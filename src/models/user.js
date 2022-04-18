const mongoose = require('../database');
const bcrypt = require('bcryptjs')

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
    musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music'}],
    DtCreate: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', UserSchema); //passa o Nome que será atribuído a essa model e o schema dele

module.exports = User;