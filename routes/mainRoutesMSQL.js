const express = require('express')
const router = express.Router()
const Registro = require('../models/RegMSQL') 
const bcrypt = require('bcrypt')
const passport = require('passport')
const Usuario = require('../models/Usuarios') 
const {eAdmin} = require('../helpers/eAdmin') 
const {loged} = require('../helpers/loged') 

// rotas get
    // Index
        router.get('/', (req, res) => {
            res.render('index')

        })
    
    // Locais acessiveis
        router.get('/locais', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("locais", {cards: cards})
                //console.log(cards)
                
            }).catch((erro) => {
                res.render("locais")
            })
        })

    // Empresas acessiveis
        router.get('/empresas', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("empresas", {cards: cards})
                
            }).catch((erro) => {
                res.render("empresas")
            })
        })

    // Servicos acessiveis
        router.get('/servicos', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("servicos", {cards: cards})
                
            }).catch((erro) => {
                res.render("servicos")
            })
        })

    // Roteiros acessiveis
        router.get('/roteiros', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("roteiros", {cards: cards})
                
            }).catch((erro) => {
                res.render("roteiros")
            })
        })

    // suporte
        router.get('/suporte', (req, res) => {
            res.render('suporte')
        })

    // cadastro
        router.get('/cadastro', (req, res) => {
            res.render('cadastro')
        })
        
    // Admin
        router.get('/admaciadm', loged, (req, res) => {
            Registro.findAll().then((pendentes) => {
                res.render("admin", {pendentes: pendentes})

            }).catch((erro) => {
                res.render("admin")
            })
            
        })

        router.get('/userlist', loged, (req, res) => {
            Registro.findAll().then((users) => {
                res.render("userlist", {users: users})

            }).catch((erro) => {
                res.render("userlist")
            })
            
        })

        // rotas de login
            router.get("/log", (req, res) => {
                res.render("login", {warn: null})
            })

            router.get("/nuser", eAdmin, (req, res) => {
                res.render("nuser", {warn: null})
            })

            router.post("/nuserreg", eAdmin, (req, res) => {

                const novoUsuario = new Usuario({
                    usuario: req.body.usuario,
                    senha: req.body.senha,
                    eAdmin: req.body.eAdmin
                })

                bcrypt.genSalt(8, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, async (erro, hash) => {
                        if(erro){
                            console.log("Erro ao salvar usuario")
                            var errores = "Erro ao cadastrar usuario"
                            res.render("nuser", {warn: errores})
                        }else{
                            novoUsuario.senha = hash

                            await Usuario.create({
                                usuario: novoUsuario.usuario,
                                senha: novoUsuario.senha,
                                eAdmin: novoUsuario.eAdmin
                            }).then(() => {
                                console.log("Usuario salvo")
                                var okres = "Usuario cadastrado"
                                res.render("nuser", {warn: okres})
                            }).catch((err) => {
                                console.log(err)
                                var errores = "Erro ao cadastrar usuario"
                                res.render("nuser", {warn: errores})
                            })
                        }
                    })
                })
            })

            router.post("/logaci", (req, res, next) => {
                
                passport.authenticate("local", {
                    successRedirect: "/admaciadm",
                    failureRedirect: "/log",
                    //failureFlash: true
                })(req, res, next)
            })

            router.get("/logout", loged, (req, res) => {
                req.logOut(() => {})
                res.redirect('/log')
            })

// Rotas Post
    // Cadastro 
    router.post('/cadastro/novo', async (req, res) => {
        console.log(req.body)
        
        const novoCad = await Registro.create({
            stat: 0,
            nomeloc: req.body.nome_servico,
            cnpj: req.body.cnpj,
            descricao: req.body.descricao,
            tipo: req.body.tipoLocal,
            selo: 0,
            cep: req.body.cep,
            rua: req.body.endereco,
            num: req.body.numero,
            bairro: req.body.bairro,
            nomeresp: req.body.nomeRepresentante,
            email: req.body.email,
            numfix: req.body.telFixo,
            numcel: req.body.telCelular,
            lat: 0,
            longt: 0

        })

        res.redirect('/cadastro')
        
    })

    // Cadastro
        router.post('/cad/sent', loged, async (req, res) => {
            console.log(req.body)
        })

        router.post('/cad/decline', loged, async (req, res) => {
            
        })

// Export
module.exports = router;