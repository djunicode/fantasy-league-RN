const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');

const {
    fixtures,
    topScorer
} = require('../controllers/matchController');

router.get('/fixtures', authentication.verifyToken,fixtures);
router.get('/topScorer',authentication.verifyToken, topScorer);
module.exports = router;