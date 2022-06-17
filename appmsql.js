// Importando modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const rotas = require('./routes/mainRoutesMSQL')

// Configuração
    // View engine
        app.set('view engine', 'ejs')
        app.set('views', 'views')

    // middlewares
        app.use(express.static("public"))

    // bodyParser
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

    // Rotas
        app.use('/', rotas)

// outros
    const port = 8082
    app.listen(port, () => {
        console.log("Servidor aberto na porta: " + port)
    })