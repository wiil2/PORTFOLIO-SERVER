const router = require("express").Router();
const UserModel = require("../models/User.model");


router.post("/signup", async (req, res) => {
    try{

        const userObj = req.body;

        const createdUser = await UserModel.create(userObj);

        delete createdUser._doc.passwordHash;

        return res.status(201).json(createdUser)


    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
});

router.get("/:userId", async (req, res) => {

    try{

        const {userId} = req.params

        const foundedUser = await UserModel.findOne({ _id: userId })

        return res.status(200).json(foundedUser)


    } catch (err) {
        console.log(err)
        return res.status(500).json(error)
    }
})

module.exports = router;