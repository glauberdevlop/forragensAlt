require('./services/mongo.service.js')
const Planta = require('./models/Plants')
const express = require('express')
const cors = require(cors)
const app = express()

app.use(
    express.urlencoded({extended: true}), 
    express.json(),
    cors()
)

const port = process.env.PORT
app.listen(port || 3000, ()=> console.log("funfando"))

app.get('/', async (req, res) =>{    
    try{
        const planta = await Planta.find()

        res.status(200).json(planta)

    } catch(error){
        res.status(500).json({error: error})
    }
})

app.get('/planta/:nome_popular', async (req, res) =>{
    const nome_planta = req.params.nome_popular

    try{
        const plantaTal = await Planta.findOne({ nome_popular: nome_planta })

        res.status(200).json(plantaTal)
    } catch(error){
        res.status(500).json({error: error})
    }
})

app.get('/plantas/orderedByName', async (req, res) =>{
    
    try {
        const plantas = await Planta.find().sort({ nome_popular: 1 })

        res.status(200).json(plantas)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/planta', async (req, res) => {
    const {nome_popular, imagens, nomes_populares,
        nome_cientifico, consumindo_por, partes_utilizadas,
        formas_de_conservacao, formas_de_oferta_e_preparo,
        composicao_de_proteina, composicao_carboidratos_totais,
        curiosidades} = req.body
    const planta = {
        nome_popular, imagens, nomes_populares,
        nome_cientifico, consumindo_por, partes_utilizadas,
        formas_de_conservacao, formas_de_oferta_e_preparo,
        composicao_de_proteina, composicao_carboidratos_totais,
        curiosidades
    }

    try{
        await Planta.create(planta)
        res.status(201).json({message: 'Planta adicionada com sucesso!'})

    } catch(error){
        res.status(500).json({error: error})

    }
})