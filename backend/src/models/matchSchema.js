const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const matchSchema = new mongoose.Schema(
    {
        venue: {
            type: String
        },
        team1: {
            type: String,
            required: true
        },
        team2: {
            type: String,
            required: true
        },
        matchTime: {
            type: Number
        }
    },
    { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
