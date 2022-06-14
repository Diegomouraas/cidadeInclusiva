const localStrategy = require("passport-local").Strategy
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

require('../models/Users')
const Usuario = mongoose.model("User")

module.exports = function(passport) {
    
    passport.use(new localStrategy({usernameField: 'usuario', passwordField: 'senha'}, (username, senha, done) => {
        Usuario.findOne({usuario: username}).then((usuario) => {
            
            if(!usuario){
                console.log("usuario n exxiste")
                return done(null,false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (err, okk) => {
                if(okk){
                    return done(null, usuario)
                }else{
                    console.log("senha errada")
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}

