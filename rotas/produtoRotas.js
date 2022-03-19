const Produtos = require('../models/Produtos')
const Usuario = require('../models/Usuario')
const routerProduto = require('express').Router()


routerProduto.post ('/', async (req, res) => {

    //req body
    const {name_produto, descricao_produto, preco, estoque, categoria_produto, marca_produto} = req.body

    const produto = {
        name_produto,
        descricao_produto,
        preco,
        estoque,
        categoria_produto,
        marca_produto
        
    }

    if (!name_produto, !preco , !estoque) {
        res.status(422).json({ error: 'Campos nome, preço e estoque são obrigatórios!'})
        return
    }
    //cadastro de dados
    try{
        await Produtos.create(produto)
        res.status(201).json({ message: 'Produto cadastrado com sucesso!'})

    } catch (error){
        res.status(500).json({error: error})

    } 
} )

 //READ - Leitura de dados
 routerProduto.get ('/', async (req, res) => {
    try{
     const produto = await Produtos.find()
     res.status(200).json(produto)
  } catch (error){
     res.status(500).json({ error: error})}
  })

  //buscar por parametro
routerProduto.get ('/:id', async (req, res) => {
     
    const id = req.params.id
    
    try {
        
        const produto = await Produtos.findOne({_id: id})

        if (!produto) {
            res.status(422).json({ message: 'Produto não encontrado.'})
            return
        }

        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

//Update
routerProduto.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {name_produto, descricao_produto, preco, estoque, categoria_produto, marca_produto} = req.body

    const produto = {
        name_produto,
        descricao_produto,
        preco,
        estoque,
        categoria_produto,
        marca_produto,
    }

    try {

        const updatedProdutos = await Produtos.updateOne({_id: id}, produto)

        if (updatedProdutos.matchedCount === 0) {
            res.status(422).json({ message: 'Produto não encontrado.' })
            return
          }

        res.status(200).json(produto)
        
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

// deletar

routerProduto.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const produto = await Produtos.findOne({ _id: id })
  
    if (!produto) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Produtos.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Produto removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })



module.exports = routerProduto