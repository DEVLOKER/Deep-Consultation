

const database = require("./src/db")
const app = require("./src/App")
// const userTest = require("./src/__test__/user.db.test")
// const consultationTest = require("./src/__test__/consultation.db.test")

database.connect()


const server = app.listen(app.get('port'), (err) => {
    if (err) console.log("Error in server setup")
    let host = server.address().address
    let port = server.address().port // app.get('port')
    console.log(`Server is running on port ${port}`);
})