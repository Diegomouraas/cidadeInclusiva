// Importando modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const rotas = require('./routes/mainRoutes')
const mongoose = require('mongoose')


// Configuração
    // middlewares

    // bodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // mongoose
        mongoose.connect("mongodb://localhost/").then(() => {
            console.log("Aplicação conectada ao servidor com sucesso!")
        }).catch((erro) => {
            console.log("Erro ao conectar no servidor: " + erro)
        })
    

// Rotas
    app.use('/rot', rotas)

// outros
    const port = 8080
    app.listen(port, () => {
        console.log("Servidor aberto na porta: " + port)
    })