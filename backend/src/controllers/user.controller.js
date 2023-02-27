const User = require('../models/user.model')
const FilesHelper = require("../helpers/files.helper")
// const session = require('express-session')


const signUp = async (req, res, next) => {
	try {
		const jsonUser = req.body
		const user = await User.signUp(jsonUser)
		
		FilesHelper.createUserFolder(user._id.toString())

        res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}


const login = async (req, res, next) => {
	try {
		let session = req.session
		const {email, password} = req.body
		const user = await User.login(email, password)
		if(!session.user) {
			session.user = user
			req.session.save()
		}
		// if(!req.cookies?.deep_cookie) res.req.cookies("deep_cookie", user)
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}


const logout = async (req, res, next) => {
	try {
		req.session.destroy()
		res.clearCookie("deep_session")
		// req.session.cookie.expires = new Date()
		// res.cookie("keyname", '', {expires: new Date(0)})
		// res.clearCookie("deep_cookie")
        res.status(200).json({})
		// req.end()
		// res.redirect('/')
	} catch (err) {
		next(err)
	}
}


const getUser = async (req, res, next) => {
	try {
		const id = req.params.id
		const user = await User.read(id)
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}



const getAllUsers = async (req, res, next) => {
	try {
        // const filters = req.query
		const users = await User.readAll()
		res.status(200).json(users)
	} catch (err) {
		next(err)
	}
}



const editUser = async (req, res, next) => {
	try {
		const id = req.params.id
		const jsonUser = req.body
		const user = await User.edit(id, jsonUser)
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}


const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id
		const user = await User.delete(id)

		FilesHelper.removeUserFolder(user._id.toString())
		
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}




module.exports = {
    signUp,
    login,
	logout,
    getUser,
    getAllUsers,
    editUser,
    deleteUser
}