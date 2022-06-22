const router = require("express").Router();
const ProjectsModel = require("../models/Projects.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isClient = require("../middlewares/isClient");
const UserModel = require("../models/User.model");


router.get("/create-project", isAuth, attachCurrentUser, isClient,  async (req,res) => {
    try{

        const loggedInUser = req.currentUser
        const createdProject = await ProjectsModel.create({
            ...req.body, user: loggedInUser._id
        });

        const idProject = await UserModel.findByIdAndUpdate(
            { _id: loggedInUser._id },
            { $push: {finished: createdProject._id} },
            { runValidators: true, new: true }
        )

        return res.status(200).json(createdProject)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

router.patch("/update-project/:projectId", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const updatedProject = await ProjectsModel.findOneAndUpdate(
            { _id: req.params.projectid },
            { ...req.body },
            { runValidators: true, new: true} 
        );

        return res.status(200).json(updatedProject);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
});

router.get("/all-projects", isAuth, attachCurrentUser, async (req, res) => {
    try{

        const getProjects = await ProjectsModel.find()

        return res.status(200).json(getProjects);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

router.get("/projectsById", isAuth, attachCurrentUser, isClient, async (req, res) => {
    try{

        const getProject = await ProjectsModel.findById(req.body.user).populate("user")

        return res.status(200).json(getProject);

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

router.delete("/delete-project/:projectId", async (req, res) => {
    try {

        const deletedProject = await ProjectsModel.deleteOne({ _id: req.params.projectId });

        return res.status(200).json({});

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

module.exports = router;