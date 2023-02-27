require("dotenv").config()
const env = process.env


const dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT || 27017,
    database: env.DB_NAME || 'deepconsultation',
    user: env.DB_USER || '',
    password: env.DB_PASSWORD || '',
    dbURL: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
};

module.exports = dbConfig