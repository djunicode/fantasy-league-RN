const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');
const {
    showPlayers,
    teamSelect,
    teamDisp
} = require('../controllers/teamController');

router.post('/showPlayers', authentication.verifyToken, showPlayers);
router.post('/teamSelect', authentication.verifyToken, teamSelect);
router.post('/teamDisp', authentication.verifyToken, teamDisp);

module.exports = router;
