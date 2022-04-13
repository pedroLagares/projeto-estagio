const express = require('express');
const router = express.Router();
const api = require('../api/api')

router.post('/register', async (req, res) => {
    api.adicionarUsuario(req, res);
});

router.post('/login', async (req, res) => {
    api.logar(req, res);
});

router.post('/logout', async (req, res) => {
    res.end();
})

module.exports = app => app.use('/auth', router)