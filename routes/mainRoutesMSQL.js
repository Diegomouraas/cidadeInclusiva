const express = require('express')
const router = express.Router()
const Registro = require('../models/RegMSQL')   

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
    // cadastro
        router.get('/cadastro', (req, res) => {
            res.render('cadastro')
        })
        
    // Admin
        router.get('/admaciadm', (req, res) => {
            Registro.findAll().then((pendentes) => {
                res.render("admin", {pendentes: pendentes})

            }).catch((erro) => {
                res.render("admin")
            })
            
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
        router.post('/cad/sent', async (req, res) => {
            console.log(req.body)
        })

        router.post('/cad/decline', async (req, res) => {
            
        })

// Export
module.exports = router;