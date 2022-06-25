const Sequelize = require('sequelize')
  
const sequelize = new Sequelize('NomeDB', 'root', 'senha', {
    host: 'localhost', 
    dialect: 'mysql'
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