const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const dotenv = require('dotenv').config({ path: 'src/.env' });
const Team=require('../models/teamSchema')
const User=require('../models/userSchema')
const axios=require('axios')


const gk=async(req,res)=>{
    try {
        const gk1=[],gk2=[],gkSub1=[],gkSub2=[]
        const { matchId }=req.body
        const data="to be fetched from api"
        const team1=data.response.team[0].startXI
        const team2=data.response.team[1].startXI
        const substi1=data.response.team[0].substitutes
        const substi2=data.response.team[1].substitutes
        for(i=0;i<team1.players.size;i++)
        {
            if(team1.players[i].pos==='G')
            gk1[i]=team1.players[i].name
            if(team2.players[i].pos==='G')
            gk2[i]=team2.players[i]
        }
        for(i=0;i<substi1.players.size;i++)
        {
            if(substi1.players[i].pos==='G')
            gkSub1[i]=substi1.players[i]
        }
        for(i=0;i<substi2.players.size;i++)
        {
            if(substi2.players[i].pos==='G')
            gkSub2[i]=substi2.players[i]
        }
        res.status(200).json({gk1,gk2,gkSub1,gkSub2})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const def=async(req,res)=>{
    try {
        const def1=[],def2=[],defSub1=[],defSub2=[]
        const { matchId }=req.body
        const data="to be fetched from api"
        const team1=data.response.team[0].startXI
        const team2=data.response.team[1].startXI
        const substi1=data.response.team[0].substitutes
        const substi2=data.response.team[1].substitutes
        for(i=0;i<team1.players.size;i++)
        {
            if(team1.players[i].pos==='D')
            def1[i]=team1.players[i]
            if(team2.players[i].pos==='D')
            def2[i]=team2.players[i]
        }
        for(i=0;i<substi1.players.size;i++)
        {
            if(substi1.players[i].pos==='D')
            defSub1[i]=substi1.players[i]
        }
        for(i=0;i<substi2.players.size;i++)
        {
            if(substi2.players[i].pos==='D')
            defSub2[i]=substi2.players[i]
        }
        res.status(200).json({def1,def2,defSub1,defSub2})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const mid=async(req,res)=>{
    try {
        const mid1=[],mid2=[],midSub1=[],midSub2=[]
        const { matchId }=req.body
        const data="to be fetched from api"
        const team1=data.response.team[0].startXI
        const team2=data.response.team[1].startXI
        const substi1=data.response.team[0].substitutes
        const substi2=data.response.team[1].substitutes
        for(i=0;i<team1.players.size;i++)
        {
            if(team1.players[i].pos==='M')
            mid1[i]=team1.players[i]
            if(team2.players[i].pos==='M')
            mid2[i]=team2.players[i]
        }
        for(i=0;i<substi1.players.size;i++)
        {
            if(substi1.players[i].pos==='M')
            midSub1[i]=substi1.players[i]
        }
        for(i=0;i<substi2.players.size;i++)
        {
            if(substi2.players[i].pos==='M')
            midSub2[i]=substi2.players[i]
        }
        res.status(200).json({mid1,mid2,midSub1,midSub2})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const forw=async(req,res)=>{
    try {
        const forw1=[],forw2=[],forwSub1=[],forwSub2=[]
        const { matchId }=req.body
        const data="to be fetched from api"
        const team1=data.response.team[0].startXI
        const team2=data.response.team[1].startXI
        const substi1=data.response.team[0].substitutes
        const substi2=data.response.team[1].substitutes
        for(i=0;i<team1.players.size;i++)
        {
            if(team1.players[i].pos==='F')
            forw1[i]=team1.players[i]
            if(team2.players[i].pos==='F')
            forw2[i]=team2.players[i]
        }
        for(i=0;i<substi1.players.size;i++)
        {
            if(substi1.players[i].pos==='F')
            forwSub1[i]=substi1.players[i]
        }
        for(i=0;i<substi2.players.size;i++)
        {
            if(substi2.players[i].pos==='F')
            forwSub2[i]=substi2.players[i]
        }
        res.status(200).json({forw1,forw2,forwSub1,forwSub2})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const teamSelect=async(req,res)=>{
    try {
        const { matchId,players:[{name,number,pos}],cap,vc}=req.body
        const team=new Team({user:userData._id,match:matchId})
        for(i=0,j=0,k=0,l=0;i<req.body.players.size;i++)    
        {
            if(req.body.players[i].pos==='G')
            team.gk=req.body.players[i].name
            if(req.body.players[i].pos==='D')
            {
                team.def[j].player=req.body.players[i].name
                j++
            }
            if(req.body.players[i].pos==='M')
            {
                team.mid[k].player=req.body.players[i].name
                k++
            }
            if(req.body.players[i].pos==='F')
            {
                team.forw[l].player=req.body.players[i].name
                l++
            }
        }
        team.cap=cap
        team.vc=vc
        await team.save
        res.status(200).json({team})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const teamDisp=async(req,res)=>{
    try {
        const {matchId}=req.body
        const team=await Team.find({user:userData._id,match:matchId})
        res.status(200).json({team})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}


module.exports={
    gk,
    def,
    mid,
    forw,
    teamSelect,
    teamDisp
}