const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
    /*require('../models/#')     //////////////////////   Trocar # pelo modelo
    const ## = mongoose.model('#') //////////////////   criar o modelo
    */
    // rotas
    // Index
router.get('/', (req, res) => {
    res.render('index')
})

// Locais acessiveis
router.get('/locais', (req, res) => {
        res.render('locais')
    })
    // Empresas acessiveis
router.get('/empresas', (req, res) => {
        res.render('empresas')
    })
    // Servicos acessiveis
router.get('/servicos', (req, res) => {
        res.render('servicos')
    })
    // Legislações
router.get('/legislacoes', (req, res) => {
    res.render('legislacoes')
})

// Login
router.get('/login', (req, res) => {
    res.render('login')
})


// Export
module.exports = router;