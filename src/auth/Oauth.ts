import createError from 'http-errors'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import UserModel from "../services/user/user-schema"
import { authenticateUser } from './tools'

const googleStrategy = new GoogleStrategy({
    clientID : process.env.GOOGLE_ID,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL : `${process.env.API_URL}/users/googleRedirect`
}, 
    async(accessToken:string, refreshToken:string, profile:any, passportNext:any) =>{
        try {
            const user = await UserModel.findOne({email : profile.emails[0].value})
            console.log("user", user)
            if(user){
                const token = await authenticateUser(user)
                console.log("user FOUND", token)
                passportNext(null, {token, role:user.role})
            }else{
                
                const newUser = new UserModel({
                    name : profile.name.givenName,
                    surname : profile.name.familyName || "not set",
                    email : profile.emails[0].value,
                    avatar : profile.photos[0].value,
                    googleId : profile.id
                })
                
                console.log("OLD user FOUND", newUser)
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