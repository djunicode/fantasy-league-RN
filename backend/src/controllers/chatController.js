const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User=require('../models/userSchema')
const Chat=require('../models/chatSchema')

const accessChat=async(req,res)=>{
    try {
        const {userId}=req.body
    if(!userId){
        return res.status(400).json({message:'User not found'})
    }
    var isChat=await Chat.find({
        $and:[
            {$users:{$elemmatch:{$eq:userData._id}}},
            {$users:{$elemmatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMsg")
    isChat=await User.populate(isChat,{
        path:'latestMsg.sender',
        select:'name email'
    })
    if(isChat.length>0)
    res.status(200).json(isChat[0])
    else
    {
        var chatData={
            chatName:'sender',
            users:[userData._id,userId]
        }  
    }
    const chat=await Chat.create(chatData)
    const fullChat=await Chat.findById(chat._id).populate("users","-password")
    res.status(200).json({fullChat}) 
}catch (error) {
    res.status(400).json({message:error.message}) 
}
}

const fetchChats=async(req,res)=>{
    try {
        await Chat.find({users:{$elemMatch:{$eq:userData._id}}})
        .populate('users','-password')
        .populate('latestMsg')
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:'latestMsg.sender',
                select:'username email'
            })
            res.status(200).json({results})
    })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={accessChat,fetchChats}