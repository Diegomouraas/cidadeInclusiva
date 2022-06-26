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
                res.render("locais", {cards: null})
            })
        })

    // Empresas acessiveis
        router.get('/empresas', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("empresas", {cards: cards})
                
            }).catch((erro) => {
                res.render("empresas", {cards: null})
            })
        })

    // Servicos acessiveis
        router.get('/servicos', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("servicos", {cards: cards})
                
            }).catch((erro) => {
                res.render("servicos", {cards: null})
            })
        })

    // Roteiros acessiveis
        router.get('/roteiros', (req, res) => {
            Registro.findAll().then((cards) => {
                res.render("roteiros", {cards: cards})
                
            }).catch((erro) => {
                res.render("roteiros", {cards: null})
            })
        })

    // suporte
        router.get('/suporte', (req, res) => {
            res.render('suporte')
        })

    // cadastro
        router.get('/cadastro', (req, res) => {
            res.render('cadastro', {warn: null})
        })
        
    // Admin
        router.get('/requisicoes', loged, (req, res) => {
            Registro.findAll().then((pendentes) => {
                res.render("requisicoes", {pendentes: pendentes})

            }).catch((erro) => {
                res.render("requisicoes", {pendentes: null})
            })
            
        })

        router.get('/userlist', eAdmin, (req, res) => {
            Usuario.findAll().then((users) => {
                res.render("userlist", {users: users})

            }).catch((erro) => {
                res.render("userlist", {users: null})
            })
            
        })

        router.post('/user/act', eAdmin, async (req, res) => {
            if(!req.body || 
                req.body == undefined || req.body == null) res.redirect("/userlist")

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
            if(!req.body || 
                req.body == undefined || req.body == null) res.redirect("/requisicoes")

            if(req.body.id === undefined || 
                req.body.selo === undefined || 
                req.body.sent === undefined) res.redirect("/requisicoes")

            if(req.body.id === null || 
                req.body.selo === null || 
                req.body.sent === null) res.redirect("/requisicoes")

            //stat: 0 pendente, 1 aceito, 2 Negado
            //sent: 1 aceitar, 2 negar, 3 deletar
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
            }else if(req.body.sent == 3){
                Registro.destroy({where: {id:req.body.id}}).then(() => {
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
                console.log(req.body)
                
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

        var erro = ""

        if(!req.body || req.body == undefined || req.body == null){
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro')
        }

        if(
        req.body.tipoLocal == undefined ||
        req.body.email == undefined ||
        req.body.cnpj == undefined ||
        req.body.cpfCheck == undefined ||
        req.body.nome_servico == undefined ||
        req.body.descricao == undefined ||
        req.body.endereco == undefined ||
        req.body.numero == undefined ||
        req.body.cep == undefined ||
        req.body.bairro == undefined ||
        req.body.nomeRepresentante == undefined)
        {
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro')

        }

        if(
            req.body.tipoLocal == null ||
            req.body.email == null ||
            req.body.cnpj == null ||
            req.body.cpfCheck == null ||
            req.body.nome_servico == null ||
            req.body.descricao == null ||
            req.body.endereco == null ||
            req.body.numero == null ||
            req.body.cep == null ||
            req.body.bairro == null ||
            req.body.nomeRepresentante == null)
            {
                erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
                res.redirect('/cadastro')   
    
            }

        if(!(req.body.tipoLocal >=0 && req.body.tipoLocal <= 4)){
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro')  
        }
        
        if(!(req.body.email.length >=5 && req.body.email.length <= 100)){
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro') 
        }

        if(req.body.endereco.length < 1){
            erro = "Endereço Invalido."
            res.redirect('/cadastro')
        }else if(req.body.endereco.length > 255){
            erro = "endereço muito longo."
            res.redirect('/cadastro')
        }

        if(req.body.numero.length < 0){
            erro = "Numero Invalido."
            res.redirect('/cadastro')
        }else if(req.body.numero.length > 255){
            erro = "Numero muito longo."
            res.redirect('/cadastro')
        }

        if(req.body.cep.length < 8){
            erro = "CEP Invalido."
            res.redirect('/cadastro')
        }else if(req.body.cep.length > 9){
            erro = "CEP Invalido."
            res.redirect('/cadastro')
        }

        if(req.body.bairro.length < 1){
            erro = "Bairro Invalido."
            res.redirect('/cadastro')
        }else if(req.body.bairro.length > 255){
            erro = "Nome do bairro muito longo."
            res.redirect('/cadastro')
        }

        if(req.body.nomeRepresentante.length < 2){
            erro = "Nome do representante Invalido."
            res.redirect('/cadastro')
        }else if(req.body.nomeRepresentante.length > 255){
            erro = "Nome do representante muito longo."
            res.redirect('/cadastro')
        }

        if(req.body.nome_servico.length < 2){
            erro = "Nome Invalido."
            res.redirect('/cadastro')
        }else if(req.body.nome_servico.length > 255){
            erro = "Nome muito longo."
            res.redirect('/cadastro')
        }

        if(req.body.descricao.length < 3){
            erro = "Descrição Invalida."
            res.redirect('/cadastro')
        }else if(req.body.descricao.length > 500){
            erro = "Descrição muito longa."
            res.redirect('/cadastro')
        }

        var cnpjok = 0
        if(req.body.cpfCheck == 1){
            var cpf = req.body.cnpj

            var vall = (cpf[0]*10)+(cpf[1]*9)+(cpf[2]*8)+
            (cpf[4]*7)+(cpf[5]*6)+(cpf[6]*5)+
            (cpf[8]*4)+(cpf[9]*3)+(cpf[10]*2)

            var fDig = ((vall*10) % 11)
            if(fDig == 10) fDig = 0

            vall = (cpf[0]*11)+(cpf[1]*10)+(cpf[2]*9)+
            (cpf[4]*8)+(cpf[5]*7)+(cpf[6]*6)+
            (cpf[8]*5)+(cpf[9]*4)+(cpf[10]*3)+(cpf[12]*2)

            var sDig = ((vall*10) % 11)
            if(sDig == 10) sDig = 0

            if(fDig == cpf[12] && sDig == cpf[13]){
                cnpjok = 1
            }else{cnpjok = 0}

        }else if(req.body.cpfCheck == 2){
            var cnpj = req.body.cnpj

            var vall = (cnpj[0]*6)+(cnpj[1]*7)+(cnpj[3]*8)+
            (cnpj[4]*9)+(cnpj[5]*2)+(cnpj[7]*3)+
            (cnpj[8]*4)+(cnpj[9]*5)+(cnpj[11]*6)+
            (cnpj[12]*7)+(cnpj[13]*8)+(cnpj[14]*9)

            var fDig = ((vall) % 11)

            vall = (cnpj[0]*5)+(cnpj[1]*6)+(cnpj[3]*7)+
            (cnpj[4]*8)+(cnpj[5]*9)+(cnpj[7]*2)+
            (cnpj[8]*3)+(cnpj[9]*4)+(cnpj[11]*5)+
            (cnpj[12]*6)+(cnpj[13]*7)+(cnpj[14]*8)+(cnpj[16]*9)

            var sDig = ((vall) % 11)

            if(fDig == (cnpj[16]*1) && sDig == (cnpj[17]*1)){
                cnpjok = 1
            }else{cnpjok = 0}
            
        }else{
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro')
        }

        if(cnpjok == 1){
            await Registro.findOne({where: {cnpj: req.body.cnpj}}).then(async (card) => {
                if(card){
                    erro = "CPF ou CNPJ já cadastrado."
                    res.redirect('/cadastro')
                }else if(!card){
                    await Registro.create({
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
            
                    }).then(() =>{
                        res.redirect({warn:"Cadastro efetuado com sucesso!"}, '/cadastro')
                    }).catch(() =>{
                        erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
                        res.redirect('/cadastro')
                    })
                }else{
                    erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
                    res.redirect({warn:"Cadastro efetuado com sucesso!"}, '/cadastro')
                }
            }).catch(() => {
                erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
                res.redirect('/cadastro')
            })
        }else if(cnpjok == 0){
            erro = "CPF ou CNPJ invalido."
            res.redirect('/cadastro')
        }else{
            erro = "Houve um erro ao tentar registrar sua solicitação. Tente novamente mais tarde."
            res.redirect('/cadastro')
        }

        
    })

// Export
module.exports = router;