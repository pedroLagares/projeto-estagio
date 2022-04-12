// const express = require('express');
// const req = require('express/lib/request');
// const Music = require('../models/musics')

// function adicionar(req, res) {
//     try {
//         const id = req.params.id;
//         const {name, url} = req.body;

//         const music = {
//             name: name,
//             url: url
//         }

//         if (await Music.findOne({url})) {
//             await Music.updateOne({_id: id}, music);
//         }
        
//         const newMusic = await Music.create(req.body);   
//         return res.send({newMusic});

//     } catch (err) {
//         return res.status(400).send({error: "Falha"});
//     }
// }

// function deletar() {
//     try {
//         const id = req.params.id;

//         const music = await Music.deleteOne({_id: id});
    
//         return `Musica deletada : ${res.send({music})}`;
//     } catch (err) {
//         return res.status(400).send({error: "Falha"});
//     }
// }

// module.exports = adicionar