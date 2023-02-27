
require("dotenv").config()

const User = require("../models/User")
// const File = require("../models/File")
const Consultation = require("../models/Consultation")
const constants = require("../constant")


// Consultation.publish({
//     name: "consultation 01", 
//     client: "63dcc2af38f3b7c84b94717b", 
//     date: new Date(), 
//     // processDate:  null, 
//     files: {
//         client: [
//             {name: "aaa.zip", size: 3250585},
//             {name: "nom de fichier.png", size: 2950585},
//             // new File({name: "nom de fichier.pdf", size: 1150585}),
//         ],
//         // admin: []
//     }, 
//     // state: constants.CONSULTATION_PROGRESSING
// })
// .then(consultation=>console.log(consultation))
// .catch(err=> console.log(err))



// Consultation.search({client: "63dcc2af38f3b7c84b94717b", state : constants.CONSULTATION_PROCESSED})
// .then(consultations=>console.log(consultations.length))
// .catch(err=> console.log(err))



// Consultation.read("63dd72ae35a9b1e58b6ce38f")
// .then(consultation=>console.log(consultation))
// .catch(err=> console.log(err))



// Consultation.edit("63de0b6e29f0e7fa6c274a9d", {
//     name: "consultation111",
//     files: {
//         client: [
//             {name: "aaa.zip", size: 3250585},
//             {name: "nom de fichier.png", size: 2950585},
//         ],
//         // admin: []
//     }
// })
// .then(consultation=>console.log(consultation))
// .catch(err=> console.log(err))



// Consultation.delete("63dd72ae35a9b1e58b6ce38f")
// .then(consultation=>console.log(consultation))
// .catch(err=> console.log(err))




// Consultation.process("63de0b6e29f0e7fa6c274a9d",[
//     {name: "nom de fichier.zip", size: 3850585},
//     {name: "nom de fichier.pdf", size: 450585},
//     {name: "nom de fichier.jpg", size: 1250585},
// ])
// .then(consultation=>console.log(consultation))
// .catch(err=> console.log(err))



// Consultation.readAll()
// .then(consultations=>console.log(consultations))
// .catch(err=> console.log(err.message))








// Consultation.deleteMany({client: "63dcc28bdb67ca4bb140b993"}, function(err, res){
//     if(err) console.log(err)
//     else console.log(res)
// })