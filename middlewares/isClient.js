const UserModel = require("../models/User.model");

module.exports = async (req, res, next) => {
    try{

        const loggedInUser = req.currentUser;

        if(loggedInUser.role !== "CLIENTE") {
            return res.status(401).json({ msg: "This user is not a client." });
        }

        next();

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}