const mongoose = require('mongoose')

const Planta = mongoose.Schema({
    id: Number,
    nomePopular: String,
    images: [
        {
            id: Number,
            url: String
        }
    ],
    nomesPopulares: String,
    nomeCientifico: String,
    nomeFamilias: String,
    consumidorPor: String,
    partesUtilizadas: String,
    formasConservacao: String,
    formasOfertaPreparo: String,
    composiçãoProteica: Number,
    composicaoDeCarboidratos: Number,
    formasDePropagracao: String,
    distribuicao: String,
    composiçãoBromatologica: String,
    consideracoesComposicao: String,
    formasPropragacaoDetalhes: String,
    produtividade: String,
    neutralizacaoDeFatoresAnti: String,
    desempenho: String,
    curiosidades: String,
    bibliografia:[
        {
            id: Number,
            pesquisa: String
        },
    ]
})

module.exports = mongoose.model("Planta", Planta)