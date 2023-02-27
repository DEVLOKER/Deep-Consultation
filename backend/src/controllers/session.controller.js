
// const session = require('express-session')


const getSession = (req,res, next) => {
    try{
        res.status(200).json(req.session.user)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getSession
}