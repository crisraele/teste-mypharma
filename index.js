require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()




app.use(cors());


//ler JSON/ middlewares
app.use (
    express.urlencoded({
        extended: true,
    })
)

//config json
app.use(express.json())


// Rotas da API 
const usuarioRotas= require('./rotas/usuarioRotas')
app.use('/Usuario', usuarioRotas)

const produtoRotas= require('./rotas/produtoRotas')
app.use('/Produtos', produtoRotas)

const categoriaRotas= require('./rotas/categoriaRotas')
app.use('/Categorias', categoriaRotas)




//endpoints
app.get('/',(req, res) => {

    res.json({ message:'Validada!'})
})

//Acesso credencial
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD



mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@apicluster.eu8im.mongodb.net/apibanco?retryWrites=true&w=majority` ,
)

.then(() => {
    console.log('Conexão Válida!')
    app.listen(3001)
})
.catch((err) => console.log(err))






