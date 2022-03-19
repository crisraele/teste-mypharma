const mongoose = require('mongoose')

const Categorias = mongoose.model('Categorias' , {
    name_categoria: String,
    descricao_categoria: String
})







module.exports = Categorias