//importing modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const fetch = require('node-fetch');
const dotenv = require('dotenv').config({ path: 'src/.env' });
const url = 'https://api.sportmonks.com/v3/football/';
const Match = require('../models/matchSchema');

//fixtures
const fixtures = async(req,res)=>{
    const Url = url+`fixtures/date/${req.body.date}?api_token=${process.env.API_KEY}`
    const options = {
        method: 'GET'
    }
    const name={};
    fetch(Url,options)
    .then(res=>res.json())
    .then(json => {
        console.log(json)
        for(let i=0;i<json.data.length;i++)
        {
            name[i]=json.data[i].name;
        }
        res.status(200).json(name);
    })
    .catch(err => console.error('error:'+err));
}
//topScorer
const topScorer = async(req,res)=>{
    const Url = url +`topscorers/seasons/${req.body.id}?api_token=${process.env.API_KEY}`;
    const options = {
        method: 'GET'
    }
    fetch(Url,options)
     .then(res=>res.json())
     .then(json=>{
        const Url1 = url+`players/${json.data[0].player_id}?api_token=${process.env.API_KEY}`;
        const options = {
            method: 'GET'
        }
        fetch(Url1,options)
         .then(res=>res.json())
         .then(json1=>{
            console.log(json1)
            const response = {
                name:json1.data.name,
                imageUrl:json1.data.image_path
            }
            res.status(200).json(response);
         })
     })
}


//exporting routes
module.exports = { fixtures ,  topScorer };