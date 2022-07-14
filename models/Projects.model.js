const { Schema, model } = require("mongoose");

const projectsSchema = new Schema({
    name: { type: String, required: true, trim: true },
    language: {type: String, required: true },
    description: {type: String, required: true, min: 10, max: 150},
    tags: {type: String, required: true, enum:["FINISHED", "IN PROGRESS"]},
    img: { type: String, default: "https://mustlovelists.com/wp-content/uploads/2021/12/Project-notebook.jpg" }
});

const ProjectsModel = model("Projects", projectsSchema );

module.exports = ProjectsModel;