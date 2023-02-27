
var express = require('express')
const { sendMail } = require('../controllers/mail.controller')
var mailRouter = express.Router()


mailRouter.post("/send", sendMail)


module.exports = mailRouter