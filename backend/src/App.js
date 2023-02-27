const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user.router")
const consultationRouter = require("./routes/consultation.router")
const mailRouter = require("./routes/mail.router")
const sessionRouter = require("./routes/session.router")
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware")
const sessionMiddleware = require("./middlewares/session.midddleware")
const generalConfig = require("./configs/general.config")
const fileConfig = require("./configs/files.config")
const fileRouter = require("./routes/file.router")
var path = require('path')

const app = express()

// init app
app.set('port', generalConfig.port)
// app.use(express.static(path.join(__dirname, '/frontend/build')))
// app.use(`/${fileConfig.resourcesFolder}`, express.static(`${fileConfig.resourcesFolder}`))
// app.use(express.static(`${fileConfig.resourcesFolder}`))

// use middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser())
app.use(sessionMiddleware)

// use routes
app.use('/users', userRouter)
app.use('/consultations', consultationRouter)
app.use('/contacts', mailRouter)
app.use('/session', sessionRouter)
app.use('/files' , fileRouter)

app.use(errorHandlerMiddleware)
// app.use('/',(req,res, next) => {
//     next()
// })

module.exports = app