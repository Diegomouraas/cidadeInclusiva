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

    nome: {
        type: String,
        required: true
    },

    cnpj: {
        type: Number,
        required: true
    },

    descricao: {
        type: Text,
        required: true
    },

    tipo: {
        type: Number,
        required: true
    },

    selo: {
        type: Number,
        required: true
    },

    cep: {
        type: Number,
        required: true
    },

    num: {
        type: Number,
        required: true
    },

    lat: {
        type: Number,
        required: true
    },

    long: {
        type: Number,
        required: true
    },

})

mongoose.model("registro", Registro)