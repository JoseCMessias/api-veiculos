// config inicial
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

//Forma de ler json
app.use
    (express.urlencoded({
        extended:true
    })
)

app.use(express.json())

//rotas da api
const Veiculos = require('./routes/Veiculos')
app.use('/Veiculos', Veiculos)

// rota inicial / endpoint
app.get('/', (req, res) => {
    // mostrar req

    res.json({msg:'Olá Express'})
})

// entregar uma porta
const DB_USER=process.env.DB_USER
const DB_PASSWORD=encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiproject.rkwieor.mongodb.net/messiasdb?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao mongoDB')
        app.listen(3600)
    })
    .catch(
        (err) => console.log(err)
    )


