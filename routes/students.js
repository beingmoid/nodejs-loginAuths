const express = require('express');

const router = express.Router();


router.get('/',(req,res)=>{
    res.send('welcome to student');
})
module.exports=router;