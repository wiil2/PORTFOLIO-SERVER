const { Schema, model, default: mongoose } = require("mongoose");

const projectsSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User"},
    name: { type: String, required: true, trim: true },
    language: {type: String, required: true },
    description: {type: String, required: true, min: 10, max: 150},
    tags: {type: String, required: true, enum:["FINALIZADO", "EM ANDAMENTO"]},
    img: { type: String, default: "https://mustlovelists.com/wp-content/uploads/2021/12/Project-notebook.jpg" },
    repo: { type: String },
    project : { type: String }
});

const ProjectsModel = model("Projects", projectsSchema );

module.exports = ProjectsModel;