const mongoose = require("mongoose")
const validator = require("validator")
const constants = require("../constant")
const File = require("./file.model")




const ConsultationSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true, 
        required: [true, "le nom de consultation ne peut pas être vide"], 
        minLength: [3, "La longueur de nom de consultation doit être superieur à 3 carcteres"],
        maxLength: [40, "La longueur de nom de consultation doit être inferieur à 40 carcteres"], 
        match: [/^[a-zA-Z0-9\s]+$/, 'le nom de consultation est invalide'], 
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    date: {
        type: Date,
        default: new Date(),
    }, 
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }, 
    processDate: {
        type: Date,
        default: null,
        required: false
    },
    files: {
        client: {
            type: [File.schema]
        },
        admin: {
            type: [File.schema],
            default: []
        }
    },
    state: {
        type: Number,
        enum: [constants.CONSULTATION_PROGRESSING, constants.CONSULTATION_PROCESSED],
        default : constants.CONSULTATION_PROGRESSING,
    }
}, {timestamps: true})


ConsultationSchema.pre('save', function(next) {
    let consultation = this
    if (consultation.files.client?.length===0) {
        next("veuillez choisir au-moins un fichier")
    } else {
        // consultation.date = new Date()
        // consultation.state = constants.CONSULTATION_PROGRESSING
        next()
    }
})

ConsultationSchema.pre('find', function () {
    this
    .populate({ path: 'client', sort: '+createdAt' })
    .populate({ path: 'admin', select: 'name', })
    .sort('-updatedAt')
})

ConsultationSchema.set('toJSON', {
    transform: (doc, ret, opt) => {
        delete ret.createdAt
        delete ret.updatedAt
        return ret
    }
})


ConsultationSchema.pre('findOneAndUpdate', async function (next) {
    const doc = await this.model.findOne(this.getQuery())
    const isAdmin = this.options.isAdmin
    let consultation = this.getUpdate()
    if(isAdmin){
        let adminFiles = consultation.$set["files.admin"] // .files?.admin
        if(!adminFiles || adminFiles===doc?.files?.admin) 
            return next()

        if (adminFiles?.length===0) {
            return next("veuillez choisir au-moins un fichier pour traiter la consultation")
        }

        consultation.state = constants.CONSULTATION_PROCESSED
        consultation.processDate = new Date()
        return next()
        
    }else{
        if(doc.state===constants.CONSULTATION_PROCESSED)
            return next("consultation déja traitée, impossible de le modéfier")

        let clientFiles = consultation.$set["files.client"] // .files?.client 
        if(!clientFiles || clientFiles===doc?.files?.client) 
            return next()

        if (clientFiles?.length==0) 
            return next("veuillez choisir au-moins un fichier pour modéfier la consultation")
        
        consultation.date = new Date()
        consultation.processDate = null
        consultation.state = constants.CONSULTATION_PROGRESSING
        return next()
    }
})



ConsultationSchema.statics = {

    publish : async(jsonConsultation) => {
        try {
            let consultation = await mongoose.models.Consultation.create(jsonConsultation)
            return consultation.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },

    search : async (filters) => {
        try {
            let consultations = await mongoose.models.Consultation.find(filters)//.populate({path: "client"})
            consultations = consultations.map(consultation=> consultation.toJSON())
            return consultations
        } catch(error) {
            return Promise.reject(error)
        }
    },

    read : async (id) => {
        try {
            let consultation = await mongoose.models.Consultation.findOne({ _id: id})//.populate({path: "client"})
            if (!consultation) throw new Error(`impossible de trouver la consultation`)
            return consultation.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },



    edit : async (id, jsonUpdate) => {
        try {
            let consultation = await mongoose.models.Consultation.findOneAndUpdate(
                    { _id : id }, 
                    { $set: {'name': jsonUpdate?.name, 'files.client': jsonUpdate?.files?.client } }, 
                    // { $set: { ...jsonUpdate }}, 
                    {new: true, isAdmin: false}
                )
            if (!consultation) throw new Error(`Consultation n'est existe pas`)
            return consultation.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },

    delete : async (id) => {
        try {
            let consultation = await mongoose.models.Consultation.findByIdAndDelete(id)
            if (!consultation) throw new Error(`Consultation n'est existe plus`)
            return consultation.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },

    process : async (id, adminFiles) => {
        try {
            let consultation = await mongoose.models.Consultation.findOneAndUpdate(
                    { _id : id }, 
                    { $set: {'files.admin': adminFiles} },
                    {new: true, isAdmin: true}
                )
            if (!consultation) throw new Error(`Consultation n'est existe pas`)
            return consultation.toJSON()
        } catch(error) {
            return Promise.reject(error)
        }
    },

}


module.exports = mongoose.model("Consultation", ConsultationSchema)