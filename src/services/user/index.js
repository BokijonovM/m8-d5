import express, {Router} from "express";
import { authenticateUser } from "../../auth/tools.js";
import UsersModel from "./user-schema.js"
import passport from 'passport'
import {JWTAuthMiddleware} from '../../auth/JWTAuthMiddleware.js'
const usersRouter = Router()
/************************* Register a new User Route  *************************/
usersRouter.post("/register", async(req, res, next) => {

    try {
        const newUser = new UsersModel(req.body)
        const savedUser = await newUser.save()
        console.log("savedUser",savedUser)
        const token = await authenticateUser(savedUser)
        console.log("token", token)
        res.status(201).send({_id:savedUser._id, token : token})
    } catch (error) {
        next(error)
    }

})

/************************* Get User Route  *************************/
usersRouter.post("/login", async(req, res, next) => {

    try { 
        try {
            const {email,password} = req.body;

            const user = await UsersModel.checkCredentials(email, password)
          if(user){
            const token = await authenticateUser(user)
            res.send({ token:token, _id : user._id });
          } else {
            next(createError(401, "Credentials are not oK !!!"))
          }
            
          } catch (error) {
            next(error);
          }
    } catch (error) {
        next(error)
    }

})

/************************* Get google login Route  *************************/
usersRouter.get("/googleLogin", passport.authenticate("google",{scope : ["email", "profile"]}) )

/************************* google login  redirect Route  *************************/
usersRouter.get("/googleRedirect", passport.authenticate("google"), (req, res, next) => {
    try {
        
        const token = req.user.token
        res.redirect(`${process.env.FE_URL}/home?token=${req.user.token}`)
    } catch (error) {
        
    }
} )

/************************* Get User Route  *************************/
usersRouter.get("/me", JWTAuthMiddleware, async(req, res, next) => {

    try {
        res.status(201).send(req.user)
    } catch (error) {
        next(error)
    }

})

export default usersRouter