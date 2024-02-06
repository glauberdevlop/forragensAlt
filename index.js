require('./services/mongo.service.js')
const Planta = require('./models/Plants')
const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())

app.use(
    express.urlencoded({ extended: true }),
    express.json(),
)

const port = process.env.PORT
// app.listen(port || 3000, ()=> console.log("funfando"))

app.listen(port, () => console.log(`Rodando na porta: ${port}`));

// Esta rota filtra uma planta por caracteres de seu nome popular através do queryParams.
// search?nome=
app.get('/search', async (req, res) => {
    try {
        let name = req.query["nome"]
        const plantas = await Planta.find()

        if (name) {
            var regex = new RegExp(name, 'i')
            const planta = await Planta.find({ "nomePopular": { $regex: regex } })
            res.status(200).json(planta)
        } else {
            res.status(200).json(plantas)
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

// Esta rota chama todas as plantas
app.get('/', async (req, res) => {
    try {
        const planta = await Planta.find()

        res.status(200).json(planta)

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

// Mostra a planta pela nome popular
app.get('/planta/:nomePopular', async (req, res) => {
    const nomePopular = req.params.nomePopular

    try {
        const plantaTal = await Planta.findOne({  nomePopular: nomePopular})

        res.status(200).json(plantaTal)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//ordenar em ordem alfabetica 
app.get('/plantas/orderedByName', async (req, res) => {

    try {
        const plantas = await Planta.find().sort({  nomePopular: 1 })

        res.status(200).json(plantas)
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

// Esta rota recupera as plantas ordenando de forma decrescente.
app.get('/plantas/orderedByProtein', async (req, res) =>{
    
    try {
        const plantas = await Planta.find().sort({ composicaoProteica: -1 })

        res.status(200).json(plantas)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/planta', async (req, res) => {
    const { id,
        nomePopular,
        images,
        nomesPopulares,
        nomeCientifico,
        nomeFamilias,
        consumidorPor,
        partesUtilizadas,
        formasConservacao,
        formasOfertaPreparo,
        composiçãoProteica,
        composicaoDeCarboidratos,
        formasDePropagracao,
        distribuicao,
        composiçãoBromatologica,
        consideracoesComposicao,
        formasPropragacaoDetalhes,
        produtividade,
        neutralizacaoDeFatoresAnti,
        desempenho,
        curiosidades,
        bibliografia, } = req.body

    const planta = {
        id,
        nomePopular,
        images,
        nomesPopulares,
        nomeCientifico,
        nomeFamilias,
        consumidorPor,
        partesUtilizadas,
        formasConservacao,
        formasOfertaPreparo,
        composiçãoProteica,
        composicaoDeCarboidratos,
        formasDePropagracao,
        distribuicao,
        composiçãoBromatologica,
        consideracoesComposicao,
        formasPropragacaoDetalhes,
        produtividade,
        neutralizacaoDeFatoresAnti,
        desempenho,
        curiosidades,
        bibliografia,
    }

    try {
        await Planta.create(planta)
        res.status(201).json({ message: 'Planta adicionada com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })

    }
});