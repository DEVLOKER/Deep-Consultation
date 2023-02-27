const Consultation = require("../models/consultation.model")
const FilesHelper = require("../helpers/files.helper")

const { resourcesFolder, tmpFolder } = require("../configs/files.config")

const publishConsultation = async (req, res, next) => {
	try {

		const jsonConsultation = JSON.parse(req.body.consultation)
		const consultation = await Consultation.publish(jsonConsultation)

		const files = req.files
		FilesHelper.createConsultationFolder(consultation.client.toString(), consultation._id.toString(), files)

        res.status(200).json(consultation)
	} catch (err) {
		next(err)
	}
}



const getConsultation = async (req, res, next) => {
	try {
		const id = req.params.id
		const consultation = await Consultation.read(id)
		res.status(200).json(consultation)
	} catch (err) {
		next(err)
	}
}



const searchConsultations = async (req, res, next) => {
	try {
        // {client: "63dcc2af38f3b7c84b94717b", state : constants.CONSULTATION_PROCESSED}
        const filters = req.query
		const consultations = await Consultation.search(filters)
		res.status(200).json(consultations)
	} catch (err) {
		next(err)
	}
}



const editConsultation = async (req, res, next) => {
	try {
		const id = req.params.id
		const jsonConsultation = JSON.parse(req.body.consultation)
		const consultation = await Consultation.edit(id, jsonConsultation)

		const files = req.files
		FilesHelper.updateClientConsultationFolder(
			consultation.client.toString(), 
			consultation._id.toString(),
			consultation.files.client,
			files
		)

		res.status(200).json(consultation)
	} catch (err) {
		next(err)
	}
}


const deleteConsultation = async (req, res, next) => {
	try {
		const id = req.params.id
		const consultation = await Consultation.delete(id)
		
		FilesHelper.removeConsultationFolder(
			consultation.client.toString(), 
			consultation._id.toString()
		)

		res.status(200).json(consultation)
	} catch (err) {
		next(err)
	}
}


const ProcessConsultation = async (req, res, next) => {
	try {
		const id = req.params.id
		const adminFiles = JSON.parse(req.body.consultation).files?.admin || []
		const consultation = await Consultation.process(id, adminFiles)

		const files = req.files
		FilesHelper.updateAdminConsultationFolder(
			consultation.client.toString(), 
			consultation._id.toString(),
			consultation.files.admin,
			files
		)

        res.status(200).json(consultation)
	} catch (err) {
		next(err)
	}
}



module.exports = {
    publishConsultation,
    getConsultation,
    searchConsultations,
    editConsultation,
    ProcessConsultation,
    deleteConsultation
}