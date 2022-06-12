const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Reg')   
const Registro = mongoose.model('registro') 

// rotas get
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

// Rotas Post
    // Cadastro 
    router.post('/cadastro/novo', (req, res) => {
        //console.log(req.body)
        res.redirect('/cadastro')

        Registro.findOne({id: "1"}).then((lala) => {
              console.log(lala)
        })
            
        
        //console.log(indexx)
/*
        const novoReg = {
            id: indexx,
            status: ,
            nome: ,
            cnpj: ,
            nomeResp: ,
            telCel: ,
            telFix: ,
            descricao: ,
            tipo: ,
            selo: ,
            cep: ,
            rua: ,
            num: ,
            bairro: ,
            lat: ,
            long: 
        }*/
        
    })

// Export
module.exports = router;