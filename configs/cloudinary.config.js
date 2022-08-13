const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storageImg = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "img-folder",
        format: async (req, file) => "png", 
        use_filename:  true, 
    },
});

const storageVid = new CloudinaryStorage({
    cloudinary, 
    params: {
        folder: "vid-folder",
        format: async (req, file) => "mp4",
        use_filename: true,
    },
});

const uploadImg = multer({ storageImg });
const uploadVid = multer({ storageVid });

module.exports = uploadImg, uploadVid;