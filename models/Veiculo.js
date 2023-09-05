const mongoose = require('mongoose')

const Veiculo = mongoose.model('Veiculo', {
    Marca: String,
    Ano: Number,
    Modelo: String,
    Status: Boolean
})

module.exports = Veiculo