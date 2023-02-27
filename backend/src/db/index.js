
const mongoose = require("mongoose")
const User = require('../models/user.model')
const dbConfig = require("../configs/db.config")
const generalConfig = require("../configs/general.config")
const mailConfig = require("../configs/mail.config")


mongoose.set('strictQuery', false)
mongoose.set('runValidators', true)

let db_conn
const connect = () => {
    mongoose.connect(dbConfig.dbURL, {
        useNewUrlParser: true, useUnifiedTopology: true,
        autoIndex: true, // useCreateIndex: true, //make this true
    }).then(() => {
        console.log("Mongodb connection established successfully!")
    },
    err => {
        console.error('App starting error:', err.stack)
        process.exit(1)
    }
    );

    db_conn = mongoose.connection
    init()
}

const init = async () => {
    const admin = {
        "name": generalConfig.adminUsername,
        "email": generalConfig.adminEmail,
        "password": generalConfig.adminPassword,
        "phone": generalConfig.adminPhone,
        "isAdmin": true
    }
    try {
        const doesAdminExit = await User.exists({isAdmin: true})
        !doesAdminExit?._id && await User.signUp(admin)
    } catch (error) {
        console.log(error)
    }
}



module.exports = { connect, db_conn }