const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest'
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
