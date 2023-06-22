const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const dotenv = require('dotenv').config({ path: 'src/.env' });
const unirest = require('unirest');
const Team = require('../models/teamSchema');
const User = require('../models/userSchema');
const axios = require('axios');
var request = require('request');
const token = process.env.SPORT_MONK_TOKEN;
const api = process.env.SPORT_MONK_URL;
async function playersData(teamId) {
    try {
        var players = [];
        var squads;
        //24 gk 25 defender 26 is midfielder 27 is forw
        const squadUrl = `${api}/squads/teams/${teamId}?api_token=${token}`;
        const squadPromise = new Promise((resolve, reject) => {
            unirest('GET', squadUrl).end(function (res) {
                if (res.error) throw new Error(res.error);
                res = JSON.parse(res.raw_body);
                squads = res.data;
                resolve();
            });
        });
        await squadPromise;
        //console.log(squads)
        for (i = 0; i < squads.length; i++) {
            let playerUrl = `${api}/players/${squads[i].player_id}?api_token=${token}`;
            let playerPromise = new Promise((resolve, reject) => {
                unirest('GET', playerUrl).end(function (res) {
                    if (res.error) throw new Error(res.error);
                    res = JSON.parse(res.raw_body);
                    players[i] = res.data;
                    resolve();
                });
            });
            await playerPromise;
        }
        return players;
    } catch (error) {
        console.log('catchedddd');
        console.log(error.message);
    }
}

const showPlayers = async (req, res) => {
    try {
        const { teamId1, teamId2 } = req.body;
        const data1 = await playersData(teamId1);
        const data2 = await playersData(teamId2);
        res.status(200).json({ data1, data2 });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const teamSelect = async (req, res) => {
    try {
        const {
            matchId,
            players: [{ name, pos }],
            cap,
            vc
        } = req.body;
        const team = new Team({ user: userData._id, match: matchId });
        for (i = 0, j = 0, k = 0, l = 0; i < req.body.players.length; i++) {
            if (req.body.players[i].pos === 24) {
                team.gk = req.body.players[i].name;
            }
            if (req.body.players[i].pos === 25) {
                team.def = team.def.concat({
                    player: req.body.players[i].name
                });
            }
            if (req.body.players[i].pos === 26) {
                team.mid = team.mid.concat({
                    player: req.body.players[i].name
                });
            }
            if (req.body.players[i].pos === 27) {
                team.forw = team.forw.concat({
                    player: req.body.players[i].name
                });
            }
        }
        team.captain = cap;
        team.vc = vc;
        await team.save;
        res.status(200).json({ team });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const teamDisp = async (req, res) => {
    try {
        const { matchId } = req.body;
        const team = await Team.find({ user: userData._id, match: matchId });
        res.status(200).json({ team });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    showPlayers,
    teamSelect,
    teamDisp
};
