const mongoose = require("mongoose")
const validator = require("validator")
const Consultation = require("./consultation.model")
// var crypto = require('crypto')
// var jwt = require('jsonwebtoken')
// var secret = require('../config').secret

const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true, 
    required: [true, "Nom d'utilisateur ne peut pas être vide"],
    minLength: [3, "La longueur du nom doit être superieur à 3 carcteres"],
    maxLength: [20, "La longueur du nom doit être inferieur à 20 carcteres"], 
    match: [/^[a-zA-Z0-9\s]*$/, "Nom d'utilisateur est invalide!"], 
  },
  email: {
    type: String,
    lowercase: true, 
    required: [true, "Email ne peut pas être vide"], 
    match: [/\S+@\S+\.\S+/, "format d'email est invalide"], 
    validate: {
        validator: checkExistingEmail,
        message: `Email existe déjà` // props => `${props.value}`
    },
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, "Mot de passe est un champ obligatoire"],
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Le mot de passe doit contenir: minuscule, majuscule, chiffre, caractère spécial"],
    minLength: [6, "La longueur du mot de passe doit être superieur à 6 carcteres"],
    maxLength: [1000, "La longueur du mot de passe doit être inferieur à 1000 carcteres"], 
    select: false
  },
  phone: {
    type: String,
    required: [true, "le numéro de téléphone ne peut pas être vide"], 
  },
  isAdmin: {
    type: Boolean, 
    default: false
  },
}, { timestamps: true })




UserSchema.pre("save", async function(next){
  let user = this
  if(!user.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

UserSchema.pre('findOneAndUpdate', async function (next) {
  let user = this.getUpdate().$set
  if(!user.password) return next()
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

UserSchema.post('findOneAndDelete', async function(user, next) {
  user && await Consultation.deleteMany({client: user._id})
  next()
})

UserSchema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret.password
    delete ret.createdAt
    delete ret.updatedAt
    return ret
    // return {...ret, _id: ret._id.toString()}
  }
})




UserSchema.methods = {
  comparePassword : async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }
}




UserSchema.statics = {

  signUp : async(jsonUser) => {
    try {
        let user = await mongoose.models.User.create(jsonUser)
        return user.toJSON()
    } catch(error){
      return Promise.reject(error)
    }
  },


  login : async(email, password) => {
    try {
      let user = await mongoose.models.User.findOne({ email }).select('+password')
      if (user) {
          const auth = await user.comparePassword(password)
          
          if (!auth) 
            throw new Error("mot de passe invalide")
          
          return user.toJSON()
      }
      throw new Error("email invalide")
    } catch (error) {
      return Promise.reject(error)
    }
  },


  read : async (id) => {
    try {
      let user = await mongoose.models.User.findOne({ _id: id})
      if (!user) throw new Error(`impossible de trouver l'utilisateur`)
      return user.toJSON()
    } catch(error) {
      return Promise.reject(error)
    }
  },


  readAll : async () => {
    try {
        let users = await mongoose.models.User.find()
        users = users.map(user=> user.toJSON())
        return users
    } catch(error) {
      return Promise.reject(error)
    }
  },


  delete : async (id) => {
    try {
        let user = await mongoose.models.User.findOneAndDelete({_id: id})
        if (!user) throw new Error(`Utilisateur n'est existe plus`)
        return user.toJSON()
    } catch(error) {
      return Promise.reject(error)
    }
  },


  edit : async (id, jsonUpdate) => {
    try {
        let user = await mongoose.models.User
          .findOneAndUpdate({ _id : id }, { $set: {...jsonUpdate} }, {new: true} )
        if (!user) throw new Error(`Utilisateur n'est existe pas`)
        return user.toJSON()
    } catch(error) {
      return Promise.reject(error)
    }
  },

}



async function checkExistingEmail (value){
  const emailCount = await mongoose.models.User.countDocuments({email: value })
  return !emailCount
}


module.exports = mongoose.model("User", UserSchema)