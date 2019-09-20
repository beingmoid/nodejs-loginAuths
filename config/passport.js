const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../config/keys');
const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');






// module.exports=function(passport){

//     var opts={};
//     opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey=config.secret;
//     passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
//         User.findOne({email:jwt_payload.email},(err,user)=>{
//             if(err) {
//                 return done(null,false);
//             }
//             if(user)
//             {
//                 return done(null,user);
//             }
//             else
//             {
//                 return done(null,false);
//             }
//         })
//     }))
// }


module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email})
            .then((user)=>{
                if(!user)
                {
                    return done(null,false,{msg:'No User found'});
                }
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{msg:'Password not incorrect'});
                    }
                })

            })
            .catch(err=>console.log(err))
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}