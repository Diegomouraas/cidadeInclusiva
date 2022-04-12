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
            res.send("Pagina que mostra os locais acessiveis")
        })
    // Empresas acessiveis
        router.get('/empresas', (req, res) => {
            res.send("Pagina que mostra as empresas com selo")
        })
    // Servicos acessiveis
        router.get('/servicos', (req, res) => {
            res.send("Pagina que mostra os servicos com selo")
        })
        


// Export
    module.exports = router;