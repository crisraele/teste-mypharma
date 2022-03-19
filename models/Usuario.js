const mongoose = require('mongoose')

const Usuario = mongoose.model('Usuario' , {
    name_usuario: String,
    email: String,
    password: String,
})





module.exports = Usuario