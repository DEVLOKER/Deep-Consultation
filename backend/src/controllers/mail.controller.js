const Mail = require("../models/mail.model")
const mailConfig = require("../configs/mail.config")
var nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: mailConfig.email,
		pass: mailConfig.password
	}
});


const sendMail = async (req, res, next) => {
	try {

		const jsonMail = req.body
		const mail = await Mail.saveMail(jsonMail)
		
		const { username, email, phone, message } = jsonMail
		const info = await transporter.sendMail({
			from: mailConfig.email,
			to: email,
			subject: 'Création d\'un compte sur Deep Consultation',
			html: `	<p>${message}.</p><br/>
					<strong>Voici mes informations personelles</strong><br/><br/>
					<strong>Nom:</strong> ${username}.<br/>
					<strong>Email:</strong> ${email}.<br/>
					<strong>Téléphone:</strong> ${phone}.<br/>
					`
		})
		
        res.status(200).json(info)
	} catch (err) {
		next(err)
	}
}


module.exports = { sendMail }