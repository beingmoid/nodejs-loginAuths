const express = require('express');

const router = express.Router();


router.get('/',(req,res)=>{
    res.render('welcome');
})
module.exports=router;
router.get('/login',(req,res)=>{
    res.render('login');
})