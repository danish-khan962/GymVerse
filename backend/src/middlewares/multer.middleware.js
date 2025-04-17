const multer = require("multer")
const {v4:uuidv4}  = require('uuid')
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

 const upload = multer({ storage,  limits: {
  fileSize: 104 * 1024 * 1024 // Limit files to 10MB
},});

 module.exports = upload;

