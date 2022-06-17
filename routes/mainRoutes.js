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
                console.log(cards)
                
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
    // cadastro
        router.get('/cadastro', (req, res) => {
            res.render('cadastro')
        })
        
    // Admin
        router.get('/admaciadm', (req, res) => {
            res.render('login')
        })

// Rotas Post
    // Cadastro 
    router.post('/cadastro/novo', (req, res) => {
        console.log(req.body)
        res.redirect('/cadastro')
        
    })

// Export
module.exports = router;