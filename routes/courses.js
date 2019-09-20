const express = require('express');

const router = express.Router();


router.get('/',(req,res)=>{
    res.send('welcome to course');
})
module.exports=router;