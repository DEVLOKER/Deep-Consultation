
require("dotenv").config()

const User = require("../models/User")
const Consultation = require("../models/Consultation")
const { File } = require("../models/File")
// const { db } = require("../services/db")
const constants = require("../constant")
const { ErrorFormatter } = require("../helpers/ModelErrorHandler")

// new db().connect()



// User.signUp({
//     name: `name${Math.floor(Math.random() * 10)}`,
//     email: `user${new Date().getTime()}@gmail.com`,
//     password: "1PasAE#q",
//     phone: "+1111111111",
//     // isAdmin: false,
// })
// .then(user=>console.log(user))
// .catch(err=> console.log(err))

// User.login("user@gmail.com&", "1PasAE#q")
// .then(user=>console.log(user))
// .catch(err=> console.log(err))


// User.read("63dcbeb2bfae97c35d68582c")
// .then(user=>console.log(user))
// .catch(err=> console.log(err))

// User.readAll()
// .then(users=>console.log(users))
// .catch(err=> console.log(err))

// User.edit("63dcc23492725fea491550be", {
//     name: "naa",
//     password: "1234AE#qbbb",
//     email: "a@a.c"
// })
// .then(user=>console.log(user))
// .catch(err=> console.log(err))

// User.delete("63dd3db991938718c7c92ab0")
// .then(user=>console.log(user))
// .catch(err=> console.log(err))