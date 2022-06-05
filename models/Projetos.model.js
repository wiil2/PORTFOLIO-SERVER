const { Schema, model } = require("mongoose");

const projetosSchema = new Schema({
    nome: { type: String, required: true, trim: true },
    linguagem: {type: String, required: true },
    descrição: {type: String, required: true, min: 10, max: 150},
    dataInicio: {type: Date, default: Date.now},
    dataTermino: {type: Date, default: Date.now}
});

const ProjetosModel = model("Projetos", projetosSchema );

module.exports = ProjetosModel;