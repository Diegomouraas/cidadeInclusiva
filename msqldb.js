const Sequelize = require('sequelize')
const sequelize = new Sequelize('angrainclusiva', 'root', 'Xinelo!123', {
    host: 'localhost', 
    //port: '8082', 
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Aplicação conectada com sucesso ao db!")
}).catch((err) => {
    console.log("Erro ao conectar aplição ao db: ", err)
})