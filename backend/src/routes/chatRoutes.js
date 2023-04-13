const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');
const {accessChat,fetchChats}=require('../controllers/chatController')
router.post('/accessChat',authentication.verifyToken,accessChat)
router.get('/fetchChats',authentication.verifyToken,fetchChats)
module.exports=router