var path = require('path')
const { resolveFilePath } = require('../helpers/files.helper')

const uploadFiles = async (req,res, next) => {
    try{
        let files = req.files
        res.status(200).json({ files: files, body: req.body})
    } catch (err) {
        next(err)
    }
}

const downloadFiles = async (req, res, next) => {
    try{
        const consultationID = req.params.consultation
        const clientID = req.params.client
        const side = req.params.side
        const name = req.query.name
        const filename = resolveFilePath(clientID, consultationID, name, side)
        res.download(filename, name)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    uploadFiles,
    downloadFiles
}