const { Schema, model } = require("mongoose");

const projectsSchema = new Schema({
    name: { type: String, required: true, trim: true },
    language: {type: String, required: true },
    description: {type: String, required: true, min: 10, max: 150},
    tags: {type: String, required: true, enum:["FINISHED", "IN PROGRESS"]},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now}
});

const ProjectsModel = model("Projects", projectsSchema );

module.exports = ProjectsModel;