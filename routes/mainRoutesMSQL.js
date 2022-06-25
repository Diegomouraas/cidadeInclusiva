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
        router.get('/requisicoes', loged, (req, res) => {
            Registro.findAll().then((pendentes) => {
                res.render("requisicoes", {pendentes: pendentes})

            }).catch((erro) => {
                res.render("requisicoes")
            })
            
        })

        router.get('/userlist', eAdmin, (req, res) => {
            Usuario.findAll().then((users) => {
                res.render("userlist", {users: users})

            }).catch((erro) => {
                res.render("userlist")
            })
            
        })

        router.post('/user/act', eAdmin, async (req, res) => {
            if(req.body == undefined || 
                req.body == null) res.redirect("/userlist")

            if(req.body.id === undefined || 
                req.body.eAdmin === undefined || 
                req.body.sent === undefined) res.redirect("/userlist")

            if(req.body.id === null || 
                req.body.eAdmin === null || 
                req.body.sent === null) res.redirect("/userlist")

            if(req.body.sent == 1){//deletar usuario
                Usuario.destroy({where: {id: req.body.id}});
            } else if(req.body.sent == 2){//mudar tipo do usuario
                if(req.body.eAdmin == 0){
                    Usuario.update({eAdmin:1}, {where: {id:req.body.id}}).then().catch()
                }else if(req.body.eAdmin == 1){
                    Usuario.update({eAdmin:0}, {where: {id:req.body.id}}).then().catch()
                }
            }else{
                res.redirect("/userlist")
            }
            res.redirect("/userlist")
        })

        router.post("/cad/act", loged, async (req, res) => {
            if(req.body == undefined || 
                req.body == null) res.redirect("/requisicoes")

            if(req.body.id === undefined || 
                req.body.selo === undefined || 
                req.body.sent === undefined) res.redirect("/requisicoes")

            if(req.body.id === null || 
                req.body.selo === null || 
                req.body.sent === null) res.redirect("/requisicoes")

            //stat: 0 pendente, 1 aceito, 2 Negado
            //sent: 1 aceitar, 2 negar
            if(req.body.sent == 1){
                Registro.update({stat:1, selo: req.body.selo}, {where: {id:req.body.id}}).then(() => {
                    res.redirect("/requisicoes")
                }).catch(() => {
                    res.redirect("/requisicoes")
                })
            }else if(req.body.sent == 2){
                Registro.update({stat:2}, {where: {id:req.body.id}}).then(() => {
                    res.redirect("/requisicoes")
                }).catch(() => {
                    res.redirect("/requisicoes")
                })
            }else{
                res.redirect("/requisicoes")
            }
            
        })

        // rotas de login
            router.get("/log", (req, res) => {
                res.render("login", {warn: null})
            })

            router.get("/nuser", eAdmin, (req, res) => {
                res.render("nuser", {warn: null})
            })

            router.post("/nuserreg", eAdmin, async (req, res) => {
                if(req.body == undefined || 
                    req.body == null) {
                        res.redirect("/nuser")
                }
    
                if(req.body.usuario === undefined ||  
                    req.body.senha === undefined) {
                        res.redirect("/nuser")
                }
    
                if(req.body.usuario === null ||  
                    req.body.senha === null) {
                        res.redirect("/nuser")
                }

                console.log(req.body.usuario)
                await Usuario.findOne({where: {usuario: req.body.usuario}}).then((user) =>{
                    console.log(user)
                    if(user){
                        var errores = "Usuario ja existe"
                        res.render("nuser", {warn: errores})
                    }else{
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
        
                                    if(novoUsuario.eAdmin){
                                        novoUsuario.eAdmin = 1
                                    }else{
                                        novoUsuario.eAdmin = 0
                                    }
        
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
                    }
                }).catch((err) => {
                    console.log(err)
                    var errores = "houve um erro durante cadastro"
                    res.render("nuser", {warn: errores})
                })
            })

            router.post("/logaci", (req, res, next) => {
                
                passport.authenticate("local", {
                    successRedirect: "/requisicoes",
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

// Export
module.exports = router;