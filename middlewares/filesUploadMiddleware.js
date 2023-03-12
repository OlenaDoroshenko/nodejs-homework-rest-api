const path = require('node:path');
const multer  = require('multer');

const FILE_DIR = path.resolve('./tmp')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, FILE_DIR)
    },
    filename: function (req, file, cb) {
    const [, extension] = file.originalname.split(".")
      cb(null, `${req.user.id}.${extension}`)
    }
  })
  
  const uploadMiddleware = multer({ storage: storage })

  module.exports = {uploadMiddleware}