const express = require('express');
const router = express.Router();
const Music = require('../models/musics')
const api = require('../api/api')

router.post('/adicionar', api.verifyJWT, async (req, res) => {
    api.adicionarMusica(req, res);
});

router.patch('/editar/:id', async (req, res) => {
    api.editarMusica(req, res);
});

router.delete('/deletar/:id', async (req, res) => {
    api.deletarMusica(req, res);
});

router.get('/listar', api.verifyJWT, async (req, res) => {
    api.listarMusicas(req, res);
    
})

module.exports = app => app.use('/playlist', router);