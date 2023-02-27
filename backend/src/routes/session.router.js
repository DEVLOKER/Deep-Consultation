
var express = require('express')
const {
    getSession,
} = require('../controllers/session.controller')
var sessionRouter = express.Router()


sessionRouter.get('/', getSession)


module.exports = sessionRouter