const mongoose = require("mongoose")
const validator = require("validator")

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom de fichier ne peut pas être vide"], 
        minLength: [4, "La longueur de nom de fichier doit être superieur à 4 carcteres"],
        maxLength: [100, "La longueur de nom de fichier doit être inferieur à 100 carcteres"], 
        match: [/\.([0-9a-zA-Z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi, "Nom de fichier est invalide!"], 
    }, 
    size: Number 
}, {strict: "throw"})

module.exports = mongoose.model("File", FileSchema)