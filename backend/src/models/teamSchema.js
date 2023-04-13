const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const teamSchema = new mongoose.Schema(
    {
        gk:{
            type:String
        },
        def:[{
            player:{
                type:String
            },
            _id:false
        }],
        mid:[{
            player:{
                type:String
            },
            _id:false
        }],
        forw:[{
            player:{
                type:String
            },
            _id:false
        }],
        credits: {
            type: Number
        },
        captain: {
            type: String
        },
        vc: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match'
        }
    },
    { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
