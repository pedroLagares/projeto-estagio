const express = require('express');
const router = express.Router();
const Music = require('../models/musics')

router.post('/adicionar', (req, res) => {
    const {name, url} = req.body;

    const music = Music.create(req.body);
    

    res.send({music});
})

module.exports = app => app.use('playlist', router);