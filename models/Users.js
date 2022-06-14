const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    usuario: {
        type: String, 
        required: true
    },

    senha: {
        type: String, 
        required: true
    }
})

mongoose.model('User', User)