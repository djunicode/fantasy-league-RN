const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const app=express()
app.use(express.json())
const dotenv=require('dotenv').config()
const SECRET_KEY=process.env.SECRET_KEY
const User=require('../models/userSchema')

const newUser=async(req,res)=>{
    try {
        const {username,email,password,mobile} = req.body
        if(!username || !email || !password || !mobile)
        return res.status(400).json({message:'Please fill all details'})
        const user=new User(req.body)
        //await //user.save()
        const token=jwt.sign({_id:user._id},SECRET_KEY,{expiresIn:'1d'}) //generating jwt
        user.tokens=user.tokens.concat({token}) //saving token in tokens field of db
        await user.save()
        return res.status(200).json({token:token,user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    return res.status(400).json({message:'Please Fill the Details'})
    try {
            const userData=await User.findOne({email:req.body.email})
            if(!userData)
            return res.status(400).json({error:'User not found'})
            const validPassword=await bcrypt.compare(req.body.password,userData.password) //comparing hashed password
            if(!userData || !validPassword)
            res.status(400).json({error:'Invalid credentials'})
            else
            {
               const token=jwt.sign({_id:userData._id},SECRET_KEY,{expiresIn:'1d'}) //generating jwt
               userData.tokens=userData.tokens.concat({token}) //saving token in tokens field of db
               await userData.save()
               return res.status(200).json({token:token,userData})
            }

    } catch (error) {
        res.status(400).json({message:error.message})
    } 
}

module.exports={newUser,userLogin}