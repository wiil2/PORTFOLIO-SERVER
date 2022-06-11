const UserModel = require("../models/User.model");

module.exports = async (req, res) => {
    try{

        const loggedUser = req.auth;

        const user = await UserModel.findOne({_id: loggedUser._id}, {passwordHash: 0});

        if(!user) {
            return res.status(400).json({msg: "This user does not exist." }); 
        }
        req.currentUser = user;

    } catch (err) {
    console.log(err)
    return res.status(500).json(500)
    }
    
}