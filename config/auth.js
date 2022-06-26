const localStrategy = require("passport-local").Strategy
const Usuario = require('../models/Usuarios')
const bcrypt = require("bcrypt")

module.exports = function(passport) {
    
    passport.use(new localStrategy({usernameField: 'usuario', passwordField: 'senha'}, (user, senha, done) => {
        Usuario.findOne({where: {usuario: user}}).then((usuario) => {
            
            if(!usuario){
                console.log("usuario n exxiste")
                return done(null,false, {message: "Esta conta não existe"})
            }
            console.log(senha)
            console.log(usuario.senha)
            bcrypt.compare(senha, usuario.senha, (err, okk) => {
                
                console.log(err)
                console.log(okk)
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
        console.log("ok")
    })

    passport.deserializeUser((id, done) => {
        console.log("notok")
        Usuario.findOne({where: {id: id}}).then((usuario, err) => {
            console.log(err)
            console.log(usuario)
            done(err, usuario)
        })
    })
}
