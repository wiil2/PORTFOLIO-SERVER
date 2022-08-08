const router = require("express").Router();
const ProjectsModel = require("../models/Projects.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const UserModel = require("../models/User.model");


router.post("/createproject", isAuth, attachCurrentUser, async (req,res) => {
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

router.patch("/update-project/:id", isAuth, attachCurrentUser, async (req, res) => {
    try {

        const updatedProject = await ProjectsModel.findOneAndUpdate(
            { id: req.params.id },
            { ...req.body },
            { runValidators: true, new: true} 
        );

        return res.status(200).json(updatedProject);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
});

router.get("/projects", isAuth, attachCurrentUser, async (req, res) => {
    try{

        const getProjects = await ProjectsModel.find()

        return res.status(200).json(getProjects);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

router.get("/projectsById", isAuth, attachCurrentUser, async (req, res) => {
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

router.get("/projects/:id", async (req, res) => {
   
    try{
        const projectById = await ProjectsModel.find({ _id: req.params.id })
        return res.status(200).json(projectById);

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})
module.exports = router;