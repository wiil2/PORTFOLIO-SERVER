const router = require("express").Router();
const bcrypt = require("bcrypt")
const UserModel = require("../models/User.model");


const saltRounds = 10;

router.post("/signup", async (req, res) => {
    try{
        // CRIPTOGRAFAR SENHA 

        const { password } = req.body;

        if ( !password || !password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)) {
            return res.status(400).json({
                msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
            });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt)

        const createdUser = await UserModel.create({
            ...req.body,
            passwordHash: passwordHash, 
        });

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