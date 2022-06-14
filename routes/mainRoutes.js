const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Reg')   
const Registro = mongoose.model('registro') 
require('../models/Users')   
const User = mongoose.model('User') 
const bcrypt = require('bcrypt')
const passport = require('passport')

// rotas
    // Index
        router.get('/', (req, res) => {

            res.render('index')
        })
    
    // Locais acessiveis
        router.get('/locais', (req, res) => {
            Registro.find().lean().then((cards) => {
                res.render("locais", {cards: cards})
                console.log(cards)
                
            }).catch((erro) => {
                res.render("locais")
            })
           
        })
    // Empresas acessiveis
        router.get('/empresas', (req, res) => {
            Registro.find().lean().then((cards) => {
                res.render("empresas", {cards: cards})
                
            }).catch((erro) => {
                res.render("empresas")
            })
        })
    // Servicos acessiveis
        router.get('/servicos', (req, res) => {
            Registro.find().lean().then((cards) => {
                res.render("servicos", {cards: cards})
                
            }).catch((erro) => {
                res.render("servicos")
            })
        })
    // cadastro
        router.get('/cadastro', (req, res) => {
            res.render('cadastro')
        })
       
    // Admin
        router.get('/admaciadm', (req, res) => {
            res.render('login')
        })

    // rotas de login
        router.get("/log", (req, res) => {
            res.render("login")
        })

        router.get("/nuser", (req, res) => {
            res.render("nuser")
        })

        router.post("/nuserreg", (req, res) => {
            const novoUsuario = new User({
                usuario: req.body.usuario,
                senha: req.body.senha
            })

            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                    if(erro){
                        console.log("Erro ao salvar usuario")
                    }else{
                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            console.log("Usuario salvo")
                        }).catch((err) => {
                            console.log(err)
                            console.log(hash)
                        })
                    }
                })
            })
        })

        router.post("/logaci", (req, res) => {
            
            passport.authenticate("local", {
                successRedirect: "/lists",
                failureRedirect: "/log",
                //failureFlash: true
            })(req, res)
        })


// Export
module.exports = router;