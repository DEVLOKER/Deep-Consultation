require("dotenv").config()

const env = process.env

const generalConfig = {
    port: env.SERVER_PORT | 4000,
    secret: env.SESSION_SECRET,
    // itemsPerLoad: 10,
    adminUsername: env.ADMIN_CONTACT_USERNAME,
    adminPassword: env.ADMIN_CONTACT_PASSWORD,
    adminEmail: env.ADMIN_CONTACT_EMAIL,
    adminPhone: env.ADMIN_CONTACT_PHONE,
}

module.exports = generalConfig