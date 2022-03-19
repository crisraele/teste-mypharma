const mongoose = require('mongoose')

const Produtos = mongoose.model('Produtos' , {
    name_produto: String,
    descricao_produto: String,
    preco: Number,
    estoque: Number,
    categoria_produto: String,
    marca_produto: String,

})




module.exports = Produtos