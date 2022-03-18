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
usersRouter.get("/", async(req, res, next) => {

    try {
        const users = await UsersModel.find()
        res.status(201).send(users)
    } catch (error) {
        next(error)
    }

})


/************************* Get google login Route  *************************/
usersRouter.get("/googleLogin", passport.authenticate("google",{scope : ["email", "profile"]}) )

/************************* google login  redirect Route  *************************/
usersRouter.get("/googleRedirect", passport.authenticate("google"), (req, res, next) => {
    try {
        console.log('i am back')
        const token = req.user.token
        console.log('i am back with token', token)
        console.log("my token", req.user.token)
        res.redirect(`${process.env.FE_URL}/home?token=${req.user.token}`)
    } catch (error) {
        
    }
} )
/************************* Get User Route  *************************/
usersRouter.post("/login", authenticateUser, async(req, res, next) => {

    try { 
        console.log(req)
        res.status(200).send()
    } catch (error) {
        next(error)
    }

})

export default usersRouter