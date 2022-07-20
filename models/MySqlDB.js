const Sequelize = require('sequelize')
const db = require('../dbConfig/db')
  
const sequelize = new Sequelize(db.DBNome, db.DBUser, db.DBSenha, {
    host: db.DBHost, 
    dialect: db.DBDialect,
    port: db.DBPort
})

sequelize.authenticate().then(() => {
    console.log("Aplicação conectada com sucesso ao db!")
}).catch((err) => {
    console.log("Erro ao conectar aplição ao db: ", err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}