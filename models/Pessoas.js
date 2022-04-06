const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Pessoas = new Schema({
    nome: { 
        type: string,
        required: true
    },

    dataNasc: {
        type: date,
        required: true
    },
    
    necessiEspeci: {
        type: number,
        required: true
    },

    newsLetter: {
        type: boolean,
        required: true
    },

    email: {
        type: email,
        required: true
    }

})