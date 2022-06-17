const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Registro = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        
    },

    id: {
        type: Number,
        required: true
    },

    status:  {
        type: Number,
        required: true
    },

    nome: {
        type: String,
        required: true
    },

    cnpj: {
        type: Number,
        required: true
    },

    nomeResp: {
        type: String, 
        required: true
    },

    telCel: {
        type: Number,
        required: true
    },

    telFix: {
        type: Number,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    tipo: {
        type: Number,
        required: true
    },

    selo: {
        type: Number,
        required: false
    },

    cep: {
        type: Number,
        required: true
    },

    rua: {
        type: String,
        required: false
    },

    num: {
        type: Number,
        required: true
    },

    bairro: {
        type: String,
        required: false
    },

    lat: {
        type: Number,
        required: false
    },

    long: {
        type: Number,
        required: false
    },

})

mongoose.model("registro", Registro)