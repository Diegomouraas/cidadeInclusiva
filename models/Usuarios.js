const db = require('./MySqlDB')

const UserMSQL = db.sequelize.define('User', {
    usuario: {
        type: db.Sequelize.STRING
    },

    senha: {
        type: db.Sequelize.STRING
    },

    eAdmin: {
        type: db.Sequelize.INTEGER,
        default: 0
    }
    
})

module.exports = UserMSQL
//UserMSQL.sync({force:true})