var path = require('path')
var multer = require('multer')

const { tmpFolder, resourcesFolder } = require('../configs/files.config')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(resourcesFolder, tmpFolder))
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).array('filesToUpload', 5)

const allowedFiles = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
        return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
    }
    cb(null, true);
}


module.exports = { upload }