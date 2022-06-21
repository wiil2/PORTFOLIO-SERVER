const router = require("express").Router();
const ProjectsModel = require("../models/Projects.model");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const UserModel = require("../models/User.model");


router.get("/create-project", isAuth, attachCurrentUser, async (req,res) => {
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

module.exports = router;