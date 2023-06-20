const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, 'Username already exists'],
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'email-id exists'],
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email-Id');
                }
            }
        },
        password: {
            type: String,
            minlength: [8, 'Password must contain minimum 8 characters'],
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            unique: [true, 'mobile no. exists'],
            length: [10, 'Mobile Number must be 10 digits ']
        },
        profilePic: {
            type: String
        },
        balance: {
            type: Number
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                },
                _id: false
            }
        ],
        otp: { type: Number },
        otpExpire: { type: Number }
    },
    { timestamps: true }
);

//logging out user details
userSchema.post('save', function (doc, next) {
    console.log('new User created', doc);
    next();
});

//hashing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 9);
    }
});
const User = mongoose.model('User', userSchema); //collection

module.exports = User;
