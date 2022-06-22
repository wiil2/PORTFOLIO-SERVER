const router = require("express").Router();

const uploadImg = require("../configs/cloudinary.config");

router.post("/upload-image", uploadImg.single("picture"), (req, res) => {
    if(!req.file) {
        return res.status(500).json({ msg: "Upload Fail" });
    }

    return res.status(201).json({ url: req.file.path });
});

module.exports = router;