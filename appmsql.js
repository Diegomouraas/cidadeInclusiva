// Importando modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const rotas = require('./routes/mainRoutesMSQL')
const passport = require('passport')
require("./config/auth")(passport)

// Configuração
    //sessão
        app.use(session({
            secret: "lala",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())

    // View engine
        app.set('view engine', 'ejs')
        app.set('views', 'views')

    // middlewares
        app.use((req, res, next) => {
            res.locals.user = req.user || null;
            next()
        })
        app.use(express.static("public"))

    // bodyParser
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

    // Rotas
        app.use('/', rotas)

// outros
    const port = 1433
    app.listen(port, () => {
        console.log("Servidor aberto na porta: " + port)
    })