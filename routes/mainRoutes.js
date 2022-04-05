const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
/*require('../models/#')     //////////////////////   Trocar # pelo modelo
const ## = mongoose.model('#') //////////////////   criar o modelo
*/
// rotas
    // Index
        router.get('/', (req, res) => {
            res.send("pagina principal")
        })