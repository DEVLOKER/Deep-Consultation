const mongoose = require("mongoose")
const validator = require("validator")

const MailSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "le nom ne peut pas être vide"], 
        minLength: [4, "La longueur de nom doit être superieur à 4 carcteres"],
        maxLength: [100, "La longueur de nom doit être inferieur à 100 carcteres"], 
        // match: [/\.([0-9a-zA-Z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi, "Nom est invalide!"], 
    }, 
    email: {
        type: String,
        lowercase: true, 
        required: [true, "Email ne peut pas être vide"], 
        match: [/\S+@\S+\.\S+/, "format d'email est invalide"], 
    },
    phone: {
        type: String,
        required: [true, "le numéro de téléphone ne peut pas être vide"], 
    },
    message: {
        type: String,
        required: [true, "le message ne peut pas être vide"], 
    },
    date: {
        type: Date,
        default: new Date(),
    },
}, {strict: "throw"})


MailSchema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret.createdAt
        delete ret.updatedAt
        return ret
    }
})


MailSchema.statics = {

    saveMail : async(jsonMail) => {
        try {
            let mail = await mongoose.models.Mail.create(jsonMail)
            return mail.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },
}

module.exports = mongoose.model("Mail", MailSchema)