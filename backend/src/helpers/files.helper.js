// const fs = require('fs')
var path = require('path')
var fs = require('fs-extra')
var path = require('path')

const {
    resourcesFolder,
    clientFolder,
    adminFolder,
    tmpFolder
} = require("../configs/files.config")
const constants = require('../constant')


const createUserFolder = (UserID)=>{
    fs.mkdirSync(path.join(resourcesFolder, UserID))
}

const removeUserFolder = (UserID)=>{
    fs.rmSync(path.join(resourcesFolder, UserID))
}

const createConsultationFolder = (ClientID, ConsultationID, files)=>{
    const clientFilesDirectory = path.join(resourcesFolder, ClientID, ConsultationID, clientFolder)
    const adminFilesDirectory = path.join(resourcesFolder, ClientID, ConsultationID, adminFolder)
    fs.mkdirSync(clientFilesDirectory, { recursive: true })
    fs.mkdirSync(adminFilesDirectory, { recursive: true })

    for(const file of files){
        fs.moveSync(
            path.join(resourcesFolder, tmpFolder, file.originalname), 
            path.join(clientFilesDirectory, file.originalname)
        )
    }
    return clientFilesDirectory
}

const removeConsultationFolder = (ClientID, ConsultationID)=>{
    const folder = path.join(resourcesFolder, ClientID, ConsultationID)
    fs.existsSync(folder) && fs.rmSync(folder, { recursive: true })
}

const updateClientConsultationFolder = (ClientID, ConsultationID, newFiles, files)=>{
    newFiles = newFiles.map(el=> el.name)
    const filesPath = path.join(resourcesFolder, ClientID, ConsultationID, clientFolder)
    const actualFiles = fs.readdirSync(filesPath)
    let differenceFiles = actualFiles.filter(file => !newFiles.includes(file))
    for (const file of differenceFiles) {
        fs.unlinkSync(path.join(filesPath, file))
    }

    for(const file of files){
        fs.moveSync(
            path.join(resourcesFolder, tmpFolder, file.originalname), 
            path.join(filesPath, file.originalname)
        )
    }
}

const updateAdminConsultationFolder = (ClientID, ConsultationID, newFiles, files)=>{
    newFiles = newFiles.map(el=> el.name)
    const filesPath = path.join(resourcesFolder, ClientID, ConsultationID, adminFolder)
    const actualFiles = fs.readdirSync(filesPath)
    let differenceFiles = actualFiles.filter(file => !newFiles.includes(file))
    for (const file of differenceFiles) {
        fs.unlinkSync(path.join(filesPath, file))
    }

    for(const file of files){
        fs.moveSync(
            path.join(resourcesFolder, tmpFolder, file.originalname), 
            path.join(filesPath, file.originalname)
        )
    }
}

const resolveFilePath = (clientID, consultationID, filename, side)=>{
    return path.resolve(
        // __dirname, "..", "..", 
        resourcesFolder, clientID, consultationID, side===constants.ADMIN_SIDE? adminFolder : clientFolder, filename
        )
}

module.exports = {
    createUserFolder,
    removeUserFolder,
    createConsultationFolder,
    removeConsultationFolder,
    updateClientConsultationFolder,
    updateAdminConsultationFolder,
    resolveFilePath
}