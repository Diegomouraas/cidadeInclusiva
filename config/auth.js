const localStrategy = require("passport-local").Strategy
const Usuario = require('../models/Usuarios')
const bcrypt = require("bcrypt")

module.exports = function(passport) {
    
    passport.use(new localStrategy({usernameField: 'usuario', passwordField: 'senha'}, (usuario, senha, done) => {
        Usuario.findAll({usuario: usuario}).then((usuario) => {
            
            if(!usuario){
                console.log("usuario n exxiste")
                return done(null,false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario[0].senha, (err, okk) => {
                //console.log(usuario.senha)
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
        done(null, usuario[0].id)
        console.log("ok")
    })

    passport.deserializeUser((id, done) => {
        console.log("notok")
        Usuario.findAll({where: {id: id}}).then((usuario, err) => {
            done(err, usuario)
        })
    })
}
