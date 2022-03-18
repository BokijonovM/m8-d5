import express, {Router} from "express";
import { authenticateUser } from "../auth/tools.js";
import UsersModel from "./user-schema.js"

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

/************************* Get User Route  *************************/
usersRouter.get("/login", async(req, res, next) => {

    try {
        const users = await UsersModel.find()
        
        res.status(201).send(users)
    } catch (error) {
        next(error)
    }

})
export default usersRouter