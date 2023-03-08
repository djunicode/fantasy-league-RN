const express=require('express')
const router=new express.Router()

const{
    newUser,
    userLogin
}=require('../controllers/userController')

router.post('/newUser',newUser)
router.post('/userLogin',userLogin)

module.exports=router