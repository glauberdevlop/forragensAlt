const mongoose = require('mongoose')

const Planta = mongoose.Schema({
    nome_popular: String,
    imagens: Array,
    nomes_populares: [String],
    nome_cientifico: String,
    consumindo_por: [String],
    partes_utilizadas: String,
    formas_de_conservacao: String,
    formas_de_oferta_e_preparo: String,
    composicao_de_proteina: Number,
    composicao_carboidratos_totais: Number,
    curiosidades: String
})

module.exports = mongoose.model("Planta", Planta)