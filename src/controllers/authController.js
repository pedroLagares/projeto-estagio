const express = require('express');
const authConfig = require('../config/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try{
        if (await User.findOne({ email })) {
            return res.status(400).send({error: 'Usuário já existente'})
        }

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({user, token: generateToken({ id: user.id })})
    }
    catch(err) {
        return res.status(400).send({error: "Falha no registro"});
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).send({error: "Usuário não encontrado"});
    }

    if (password != user.password) {
        return res.status(203).send({error: "Senha incorreta"});
    }
    
    user.password = undefined;

    

    res.send({ user, token: generateToken({ id: user.id })});
});

module.exports = app => app.use('/auth', router)