require("dotenv").config()

const env = process.env

const mailConfig = {
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
}

module.exports = mailConfig

// ozvj kwxz eoyp xlpw