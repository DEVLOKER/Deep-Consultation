const sessions = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(sessions)
const generalConfig = require('../configs/general.config')
const dbConfig = require('../configs/db.config')

const store = new MongoDBStore({
    uri: dbConfig.dbURL,
    collection: 'sessions'
})
const oneDay = 1000 * 10 * 60 * 24

const session = sessions({
    key: "deep_session",
    secret: generalConfig.secret,
    saveUninitialized:false,
    store: store,
    cookie: { 
        maxAge: oneDay,
        httpOnly: true,
        secure: false,
        // domain: "deep-consultation"
    }, 
    resave: false
})

module.exports = session
