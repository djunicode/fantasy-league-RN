const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const dotenv = require('dotenv').config({ path: 'src/.env' });
const { sendEmail } = require('../utility/functions');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userSchema');

const newUser = async (req, res) => {
    try {
        const { username, email, password, mobile } = req.body;
        if (!username || !email || !password || !mobile)
            return res.status(400).json({ message: 'Please fill all details' });
        const user = new User(req.body);
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
            expiresIn: '1d'
        }); //generating jwt
        user.tokens = user.tokens.concat({ token }); //saving token in tokens field of db
        await user.save();
        //sending verification mail
        await sendEmail({
            emailId: email,
            subject: 'Signed up',
            message: 'Verification mail for your account on fantasyLeague'
        });
        return res.status(200).json({ token: token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Please Fill the Details' });
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) return res.status(400).json({ error: 'User not found' });
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        ); //comparing hashed password
        if (!userData || !validPassword)
            res.status(400).json({ error: 'Invalid credentials' });
        else {
            const token = jwt.sign({ _id: userData._id }, SECRET_KEY, {
                expiresIn: '1d'
            }); //generating jwt
            userData.tokens = userData.tokens.concat({ token }); //saving token in tokens field of db
            await userData.save();
            //sending verification mail
            await sendEmail({
                emailId: email,
                subject: 'Logged In',
                message: 'Verification mail for login on fantasyLeague'
            });
            return res.status(200).json({ token: token, userData });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const user = userData;
        const tkn = req.header('AuthenticateUser').split(' ')[1];
        //removing the logged in token from db
        user.tokens = user.tokens.filter((token) => {
            return token.token != tkn;
        });
        await user.save();
        res.status(200).json({ message: 'Logged Out' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const logoutAll = async (req, res) => {
    try {
        const tkn = req.header('AuthenticateUser').split(' ')[1];
        if (!tkn) {
            res.status(400).json({ message: 'Auth failed' });
        } else {
            const tokens = userData.tokens;
            //removing all tokens from db
            await User.findByIdAndUpdate(userData._id, { tokens: [] });
            res.status(200).json({ message: 'Successfully logged out' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error' });
    }
};

module.exports = { newUser, userLogin, logout, logoutAll };
