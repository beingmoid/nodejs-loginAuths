const express = require('express');

const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated}=require('../config/auth');


router.get('/',(req,res)=>{
    res.send('welcome to user');
})
router.get('/register',(req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        name:req.user.name
    });
})

router.post('/register',(req,res)=>
{
    const {name,email,password}=req.body;
 User.findOne({email:email}).then(user=>{
     if(user)
     {
         req.body('this email already registerd');
     }
     else{
         
         const newUser = new User({
             name,
             email,
             password
         });
         bcrypt.genSalt(10,(err,salt)=>
         {
            bcrypt.hash(newUser.password,salt,(err,hash)=>
            {
                if(err) throw err;
                else{
                    newUser.password=hash;
                    newUser.save()
                    .then((user)=>{
                        res.redirect('/login');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
            })    
         });
         

     }
 })   
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/users/dashboard',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next)

})

router.get('/logout',(req,res)=>{
req.logOut();
res.redirect('/login');
})
module.exports=router;