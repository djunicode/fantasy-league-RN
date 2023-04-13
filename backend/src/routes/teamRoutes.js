const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');
const {
    gk,
    def,
    mid,
    forw,
    teamSelect,
    teamDisp
}=require('../controllers/teamController')

router.get('/gk',authentication.verifyToken,gk)
router.get('/def',authentication.verifyToken,def)
router.get('/mid',authentication.verifyToken,mid)
router.get('/forw',authentication.verifyToken,forw)
router.post('/teamSelect',authentication.verifyToken,teamSelect)
router.get('/teamDisp',authentication.verifyToken,teamDisp)

module.exports=router