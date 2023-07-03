const express = require("express")
const {getprivateContest,getallContest,createContest,deleteContest,updateContest,addUser,removeUser} = require("../controllers/contestController")
const authentication = require("../middlewares/auth.js")

const ContestRoutes = express();

ContestRoutes.get('/private', authentication.verifyToken , getprivateContest)
ContestRoutes.get('/all', authentication.verifyToken , getallContest)
ContestRoutes.post('/create', authentication.verifyToken , createContest)
ContestRoutes.delete('/delete', authentication.verifyToken, deleteContest)
ContestRoutes.put('/change', authentication.verifyToken, updateContest)
ContestRoutes.put('/add', authentication.verifyToken, addUser)
ContestRoutes.put('/remove', authentication.verifyToken, removeUser)

module.exports = ContestRoutes