const express = require('express');
const router = express.Router();
const Music = require('../models/musics')
const api = require('../api/api-playlist')

router.post('/adicionar', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, url} = req.body;

        const music = {
            name: name,
            url: url
        }

        if (await Music.findOne({url})) {
            await Music.updateOne({_id: id}, music);
        }
        
        const newMusic = await Music.create(req.body);   
        return res.send({newMusic});

    } catch (err) {
        return res.status(400).send({error: "Falha"});
    }
});

router.patch('/editar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, url} = req.body;

        const music = {
            name: name,
            url: url
        }

        const newMusic = await Music.updateOne({_id: id}, music);
        return res.send({newMusic});

    } catch (err) {
        return res.status(400).send({error: "Falha"});
    }
});

router.delete('/deletar/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const music = await Music.deleteOne({_id: id});
    
        return `Musica deletada : ${res.send({music})}`;
    } catch (err) {
        return res.status(400).send({error: "Falha"});
    }
});

router.get('/listar', async (req, res) => {
    try {
        const musics = await Music.find();
        return res.status(200).send({musics});

    } catch (err) {
        return res.status(400).send({error: "Falha"});
    }
    
})

module.exports = app => app.use('/playlist', router);