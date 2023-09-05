const router = require('express').Router()

const Veiculo = require('../models/Veiculo')

// Create - Criação de dados
router.post('/', async (req, res) =>{
    // req.body

    // {name: "Fulano", salary: 1500, approved: false}
    const {Marca, Ano, Modelo, Status} = req.body
    if(!Marca){
        res.status(422).json({error: 'A Marca é obrigatória'})
        return
    }

    const veiculo = {
        Marca,
        Ano, 
        Modelo,
        Status
    }

    try {
        await Veiculo.create(veiculo)
        res.status(200).json({
            msg:'Veículo criado com sucesso'
        })
    } catch (error) {
        res.status(500).json({
            msg:error
        })
    }
})

// Read - Leitura de dados
router.get('/', async (req, res) => {
    try {
        const veic = await Veiculo.find()

        res.status(200).json(veic)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    try{
        const veic = await Veiculo.findOne({ _id: id })

        if(!veic){
            res.status(422).json({msg: 'Veículo não encontrado'})
            return
        }

        res.status(200).json(veic)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update - atualização de dados (PUT, PATCH)
// sendo o put para atualização completa, e o patch para atualização parcial
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {Marca, Ano, Modelo, Status} = req.body
    
    const veiculo = {
        Marca,
        Ano, 
        Modelo,
        Status,
    }

    try{
        const UpdateVeic = await Veiculo.updateOne({ _id: id }, veiculo)

        if(UpdateVeic.matchedCount === 0){
            res.status(422).json({msg: 'Veículo não encontrado'})
            return
        } 

        res.status(200).json(veiculo)
    }catch(error) {
        res.status(500).json({error: error})
    }
})

// Delete - Deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const veic = await Veiculo.findOne({ _id: id })

    if(!veic){
        res.status(422).json({msg: 'Veículo não encontrado'})
        return
    }

    try{
        await Veiculo.deleteOne({_id: id})

        res.status(200).json({msg: 'Veículo removido com sucesso!'})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

module.exports = router