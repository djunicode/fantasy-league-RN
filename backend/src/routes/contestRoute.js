const express = require('express');
const {
    getContest,
    createContest,
    deleteContest,
    updateContest,
    addUser,
    removeUser
} = require('../controllers/contest');
const authentication = require('../middlewares/auth.js');

const ContestRoutes = express();

ContestRoutes.get('/', authentication, getContest);
ContestRoutes.post('/', authentication, createContest);
ContestRoutes.delete('/', authentication, deleteContest);
ContestRoutes.put('/', authentication, updateContest);
ContestRoutes.put('/add', authentication, addUser);
ContestRoutes.put('/remove', authentication, removeUser);

module.exports = { ContestRoutes };
