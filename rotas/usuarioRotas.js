const { append } = require('express/lib/response')
const Usuario = require('../models/Usuario')
const routerUsuario = require('express').Router()


//cadastro de dados - CREATE
routerUsuario.post ('/Login', async (req, res) => {

    //req body
    const {name_usuario, email, password} = req.body

    const usuario = Usuario({
        name_usuario,
        email,
        password,

    })

    if (!name_usuario, !email) {
        res.status(404).json({ error: 'Campos nome e e-mail são obrigatórios!'})
        return
    }




//verificar usuário
const usuarioExists = await Usuario.findOne({email : email})

if(usuarioExists){
  res.status(422).json({ error: 'Email já existe!'})
}



if(checkPassword){
  res.status(422).json({ error: 'Senha inválida!'})
}

//nova senha
const salt = await bcrypt.gensalt(10)
//const passwordHash = await bcrypt.hash(password, salt)
    
    try{
        await Usuario.create(usuario)
        
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!'})
        return
    } catch (error){
        res.status(500).json({ error: error})

    } 


    try{
      const secret = process.env.SECRET

      const token = jwt.sign(
        {
        id: usuario._id
         }, 
      secret,
      )
res.status(200).json({msg: "Autenticação realizada!", token})

    } catch (error){
        res.status(500).json({ error: error})
    }
} )

//token
function checkToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split("")[1]

  if(!token) {
    return res.status(404).json({ msg: "Acesso negado"})
  }

  try{

    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()

  } catch (error){
    res.status(400).json({msg: "token inválido!"})
  }
}



     //READ - Leitura de dados
     routerUsuario.get ('/', async (req, res) => {

       try{
        const usuario = await Usuario.find()
        res.status(200).json(usuario)
     } catch (error){
        res.status(500).json({ error: error})}
     })

       //buscar por parametro
routerUsuario.get ('/:email', async (req, res) => {
     
  const email = req.params.email
    //console.log(email);
    try {
        
        const usuario = await Usuario.findOne({email: email})

        if (!usuario) {
          return res.status(422).json({ message: 'Usuário não encontrado.'})
            
        }

        return res.status(200).json(usuario)
    } catch (error) {
       return res.status(500).json({ error: error})
    }

})




//Update
routerUsuario.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {name_usuario, email, password} = req.body

    const usuario = {
        name_usuario,
        email,
        password,

    }

    try {

        const updatedUsuario = await Usuario.updateOne({_id: id}, usuario)

        if (updatedUsuario.matchedCount === 0) {
            res.status(422).json({ message: 'Usuario não encontrado.' })
            return
          }

        res.status(200).json(usuario)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

// deletar

routerUsuario.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const usuario = await Usuario.findOne({ _id: id })
  
    if (!usuario) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Usuario.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })





     module.exports = routerUsuario