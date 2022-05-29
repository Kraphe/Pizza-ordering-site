const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

const bcrypt = require('bcrypt')

function init(passport){
     passport.use(new LocalStrategy({usernameField:'email'}, async(email,password,done)=>{
         //login
         //check if email exists
         const user=await User.findOne({email:email})
         if(!user){
             return done(null,false,{message:'No user with this email'})
         }

         //comparing password enter by user to the database password
         bcrypt.compare(password,user.password).then(match=>{
             if(match){
                 return done(null,user,{message:'Loggd in sucessfully'})
             }
             return done(null,false,{message:'wrong Username or Password'})
         }).catch(err=>{
             return done(null,false,{message:'Something went wrong'})  //this error come when there is internal error like in module or passport or database
         })
        }))
         //storing user id in session so that we get to know when or whether user logged in or not
         passport.serializeUser((user,done)=>{
             done(null,user._id)
         })

         // getting id which are stored in session 
         passport.deserializeUser((id,done)=>{
             User.findById(id,(err,user)=>{
                 done(err,user)
             })
         })

}


module.exports = init 