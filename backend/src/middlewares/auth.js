const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: 'src/.env' });
const User = require('../models/userSchema');
const authentication = {
    verifyToken: async (req, res, next) => {
        try {
            let flag = 0;
            let tkn = req.header('AuthenticateUser');
            if (typeof tkn === 'undefined')
                return res.status(401).json({ error: 'Unauthorized' });
            if (tkn.startsWith('Bearer ')) {
                tkn = tkn.split(' ')[1];
                if (tkn) {
                    try {
                        const data = jwt.verify(tkn, process.env.SECRET_KEY);
                        const user = await User.findById(data._id);
                        //comparing token in header with each token in db
                        user.tokens.forEach((token) => {
                            if (tkn === token.token) flag = 1;
                        });
                        if (flag == 1) userData = user;
                        else
                            return res
                                .status(400)
                                .json({ message: 'InvalidUser' });
                        next();
                    } catch (error) {
                        return res.status(400).json({ error: 'Invalid Token' });
                    }
                }
            }
        } catch (error) {
            return res.status(401).send(error.message);
        }
    }
};

module.exports = authentication;
