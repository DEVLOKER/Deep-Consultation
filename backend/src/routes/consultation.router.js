
var express = require('express')
const {
    publishConsultation,
    getConsultation,
    searchConsultations,
    editConsultation,
    ProcessConsultation,
    deleteConsultation
} = require('../controllers/consultation.controller')
const { upload } = require('../middlewares/upload.middleware')

var consultationRouter = express.Router()


consultationRouter.post("/publish", upload, publishConsultation)

consultationRouter.get("/:id", getConsultation)

consultationRouter.get("/", searchConsultations)

consultationRouter.put("/:id", upload, editConsultation)

consultationRouter.patch("/:id", upload, ProcessConsultation)

consultationRouter.delete("/:id", deleteConsultation)


module.exports = consultationRouter