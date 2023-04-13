const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');
const {
    sendMessage,
    allMessages
}=require('../controllers/messageController')
router.post('/sendMessage',authentication.verifyToken,sendMessage)
router.post('/allMessages',authentication.verifyToken,allMessages)

module.exports=router