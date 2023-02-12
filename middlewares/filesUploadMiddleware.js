const path = require('node:path');
const multer  = require('multer');

const FILE_DIR = path.resolve('./tmp')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, FILE_DIR)
    },
    filename: function (req, file, cb) {
    const [fileName, extension] = file.originalname.split(".")
      cb(null, `${fileName}.${extension}`)
    }
  })
  
  const uploadMiddleware = multer({ storage: storage })

  module.exports = {uploadMiddleware}