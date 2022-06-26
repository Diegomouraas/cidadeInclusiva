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
            if(req.user){
                console.log(req.user.eAdmin)
                res.locals.user = {
                    usuario: req.user.usuario,
                    eAdmin: req.user.eAdmin
                }

            }else{
                res.locals.user = null;
            }

            next()
        })
        app.use(express.static("public"))

    // bodyParser
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

    // Rotas
        app.use('/', rotas)

// outros
    const port = process.env.PORT || 1434
    app.listen(port, () => {
        console.log("Servidor aberto na porta: " + port)
    })