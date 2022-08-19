const router = require("express").Router();

const uploadImg = require("../configs/cloudinary.config");

const isAuth = require("../middlewares/isAuth");

router.post("/upload-image", isAuth, uploadImg.single("picture"), (req, res) => {
    if(!req.file) {
        return res.status(500).json({ msg: "Upload Fail." });
    }
    return res.status(201).json({ url: req.file.path });
    
});

module.exports = router;