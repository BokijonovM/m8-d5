import express, {Router} from "express";
import { authenticateUser } from "../../auth/tools.js";
import UsersModel from "./user-schema.js"
import passport from 'passport'
import {JWTAuthMiddleware} from '../../auth/JWTAuthMiddleware.js'
import createError from "http-errors";
import { adminMiddleware } from "../../auth/adminMiddleware.js";
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

/************************* Get All User by Admin Route  *************************/
usersRouter.get("/", JWTAuthMiddleware,adminMiddleware, async(req, res, next) => {

    try {
        const reqUsers = await UsersModel.find()
        if(reqUsers){
            res.status(201).send(reqUsers)
        } else {
            next(createError(404, "user not found"))

        }
    } catch (error) {
        next(error)
    }
})

/************************* Get User by from Route  *************************/
usersRouter.get("/me", JWTAuthMiddleware, async(req, res, next) => {

    try {
        const reqUser = await UsersModel.findById(req.user._id)
        if(reqUser){
            res.status(201).send(reqUser)
        } else {
            next(createError(404, "user not found"))

        }
    } catch (error) {
        next(error)
    }
})

/************************* Edit User by from Route  *************************/
usersRouter.put("/me", JWTAuthMiddleware, async(req, res, next) => {

    try {
        const reqUser = await UsersModel.findByIdAndUpdate(
                        req.user._id,
                        req.body,
                        {new:true})
        if(reqUser){
            res.status(201).send(reqUser)
        } else {
            next(createError(404, "user not found"))

        }
    } catch (error) {
        next(error)
    }
})

/************************* delete User by from Route  *************************/
usersRouter.delete("/me", JWTAuthMiddleware, async(req, res, next) => {

    try {
        const reqUser = await UsersModel.findByIdAndDelete(req.user._id)
        if(reqUser){
            res.status(204).send(reqUser)
        } else {
            next(createError(404, "user not found"))

        }
    } catch (error) {
        next(error)
    }
})

/************************* delete User by from Route  *************************/
usersRouter.delete("/me", JWTAuthMiddleware,  async(req, res, next) => {

    try {
        const reqUser = await UsersModel.findByIdAndDelete(req.user._id)
        if(reqUser){
            res.status(204).send(reqUser)
        } else {
            next(createError(404, "user not found"))

        }
    } catch (error) {
        next(error)
    }
})



export default usersRouter