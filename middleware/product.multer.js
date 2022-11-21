
const multer  = require('multer')
const path = require('path');


const storage = multer.diskStorage({
    destination: "public/images/product",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /jpg|jpeg|png/;
        const extension = path.extname(file.originalname);
        if (supportedImage.test(extension)) {
            // null= error
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpg/jpeg image"))
        }
    },
    limits: {
        fileSize: 5000000,
    }
})


module.exports = upload;