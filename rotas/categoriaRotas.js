const Categorias = require('../models/Categorias_Produto')
const routerCategoria = require('express').Router()


routerCategoria.post ('/', async (req, res) => {

    //req body
    const {name_categoria, descricao_categoria} = req.body

    const categoria = {
        name_categoria,
        descricao_categoria
    }
    if (!name_categoria, !descricao_categoria) {
        res.status(422).json({ error: 'Campos nome e descrição são obrigatórios!'})
        return
    }
    //cadastro de dados
    try{
        await Categorias.create(categoria)
        res.status(201).json({ message: 'Categorias inserida com sucesso!'})
        
        
    } catch (error){
        res.status(500).json({error: error})

    } 
} )

 //READ - Leitura de dados
 routerCategoria.get ('/', async (req, res) => {
    try{
     const categoria = await Categorias.find()
     res.status(200).json(categoria)
  } catch (error){
     res.status(500).json({ error: error})}
  })

    //buscar por parametro
routerCategoria.get ('/:id', async (req, res) => {
     
    const id = req.params.id
    
    try {
        
        const categoria = await Categorias.findOne({_id: id})

        if (!categoria) {
            res.status(422).json({ message: 'Categoria não encontrada.'})
            return
        }

        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

//Update
routerCategoria.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {name_categoria, descricao_categoria} = req.body

    const categoria = {
        name_categoria,
        descricao_categoria,
    }

    try {

        const updatedCategorias = await Categorias.updateOne({_id: id}, categoria)

        if (updatedCategorias.matchedCount === 0) {
            res.status(422).json({ message: 'Categoria não encontrada.' })
            return
          }

        res.status(200).json(categoria)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

// deletar

routerCategoria.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const categoria = await Categorias.findOne({ _id: id })
  
    if (!categoria) {
      res.status(422).json({ message: 'Categoria não encontrada!' })
      return
    }
  
    try {
      await Categorias.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Categoria removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

module.exports = routerCategoria