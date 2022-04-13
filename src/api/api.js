const express = require('express');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const Music = require('../models/musics');
const User = require('../models/user')

module.exports = {

    listarMusicas: async (req, res) => {
        try {
            const musics = await Music.find({user: req.id});
            return res.status(200).send({musics});
        
        } catch (err) {
            return res.status(400).send({error: "Falha"});
        }
    },

    adicionarMusica: async (req, res) => {
        try {
            const {name, url} = req.body;
            req.body.user = req.id;
    
            const music = {
                name: name,
                url: url
            }
    
            if (await Music.findOne({url})) {
                const oldMusic = Music.findOne({url}).populate('User')
                await Music.updateOne({_id: oldMusic.id}, music);
            }
            
            const newMusic = await Music.create(req.body);   
            return res.send({newMusic});
    
        } catch (err) {
            return res.status(400).send({error: "Falha"});
        }
    },

    deletarMusica: async (req, res) => {
        try {
            const id = req.params.id;
    
            const music = await Music.deleteOne({_id: id});
        
            return `Musica deletada : ${res.send({music})}`;
        } catch (err) {
            return res.status(400).send({error: "Falha"});
        }
    },

    editarMusica: async (req, res) => {
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
    },

    adicionarUsuario: async (req, res) => {
        const { email } = req.body;
        
        try{
            if (await User.findOne({ email })) {
                return res.status(400).send({error: 'Usuário já existente'})
            }

            const user = await User.create(req.body);
            user.password = undefined;

            return res.send({user, token: jwt.sign({id: user.id}, authConfig.secret, {expiresIn: 86400} )});
        }
        catch(err) {
            return res.status(400).send({error: "Falha no registro"});
        }
    },

    verifyJWT: (req, res, next) => {
        const token = req.headers['x-access-token'];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).end();
            }
            req.id = decoded.id
            next();
        })
    },

    logar: async (req, res) => {
        const {email, password} = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).send({error: "Usuário não encontrado"});
        }

        if (password != user.password) {
            return res.status(203).send({error: "Senha incorreta"});
        }
        
        const token = jwt.sign({id: user.id}, authConfig.secret, {expiresIn: 86400} )

        res.send({user: user, auth: true, token});
    }
}
// function verifyJWT(req, res, next){
//     const token = req.headers['x-access-token'];
//     if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
//     jwt.verify(token, process.env.SECRET, function(err, decoded) {
//       if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
//       // se tudo estiver ok, salva no request para uso posterior
//       req.userId = decoded.id;
//       next();
//     });
// }