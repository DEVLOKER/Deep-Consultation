
var express = require('express')
const {
    signUp,
    login,
    logout,
    getUser,
    getAllUsers,
    editUser,
    deleteUser
} = require('../controllers/user.controller')
var userRouter = express.Router()


userRouter.post("/signup", signUp)

userRouter.post("/login", login)

userRouter.get("/logout", logout)

userRouter.get("/:id", getUser)

userRouter.get("/", getAllUsers)

userRouter.put("/:id", editUser)

userRouter.delete("/:id", deleteUser)


module.exports = userRouter