import createError from 'http-errors'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import UserModel from "../services/user/user-schema.js"
import { authenticateUser } from './tools.js'

const googleStrategy = new GoogleStrategy({
    clientID : process.env.GOOGLE_ID,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL : `${process.env.API_URL}/users/googleRedirect`
}, 
    async(accessToken, refreshToken, profile, passportNext) =>{
        try {
            const user = await UserModel.findOne({email : profile.emails[0].value})
            if(user){
                const token = await authenticateUser(user)
                passportNext(null, {token, role:authorize.role})
            }else{
                
                const newUser = new UserModel({
                    name : profile.name.given_name,
                    surname : profile.name.familyName || "not set",
                    email : profile.emails[0].value,
                    avatar : profile.photos[0].value,
                    googleId : profile.id
                })

                const savedUser = newUser.save()
                const token  = await authenticateUser(savedUser)
                console.log("new user saved and token is", token)
               passportNext(null, {token})
            }

        } catch (error) {
            console.log(error)
        }
    }
    )

    passport.serializeUser((data, passportNext) => {
        passportNext(null,data)
    })

    export default googleStrategy