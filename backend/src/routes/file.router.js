
var express = require('express')
const {
    uploadFiles,
    downloadFiles
} = require('../controllers/file.controller')
const { upload } = require('../middlewares/upload.middleware')
var fileRouter = express.Router()


fileRouter.post('/upload', upload, uploadFiles)
fileRouter.get('/download/:client/:consultation/:side', downloadFiles)


module.exports = fileRouter