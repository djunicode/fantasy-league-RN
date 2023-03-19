const express = require('express');
const router = new express.Router();
const authentication = require('../middlewares/auth');
const {
    newUser,
    userLogin,
    logout,
    logoutAll,
    forgotPass,
    verifyOtp,
    newPass
} = require('../controllers/userController');

router.post('/newUser', newUser);
router.post('/userLogin', userLogin);
router.get('/logout', authentication.verifyToken, logout);
router.get('/logoutAll', authentication.verifyToken, logoutAll);
router.post('/forgotPass', forgotPass);
router.post('/verifyOtp', verifyOtp);
router.post('/newPass', newPass);
module.exports = router;
