const db = require('./MySqlDB')

const RegMSQL = db.sequelize.define('Reg', {
        stat: {
            type: db.Sequelize.INTEGER
        },
        nomeloc: {
            type: db.Sequelize.STRING
        },
        cnpj: {
            type: db.Sequelize.STRING
        },
        descricao: {
            type: db.Sequelize.TEXT
        },
        tipo: {
            type: db.Sequelize.INTEGER
        },
        selo: {
            type: db.Sequelize.INTEGER
        },
        cep: {
            type: db.Sequelize.STRING
        },
        rua: {
            type: db.Sequelize.STRING
        },
        num: {
            type: db.Sequelize.STRING
        },
        bairro: {
            type: db.Sequelize.STRING
        },
        nomeresp: {
            type: db.Sequelize.STRING
        },
        email: {
            type: db.Sequelize.STRING
        },
        numfix: {
            type: db.Sequelize.STRING
        },
        numcel: {
            type: db.Sequelize.STRING
        },
        lat: {
            type: db.Sequelize.STRING
        },
        longt: {
            type: db.Sequelize.STRING
        }
})

module.exports = RegMSQL
//RegMSQL.sync({force:true})