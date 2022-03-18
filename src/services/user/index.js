import express, {Router} from "express";
import UsersModel from "./user-schema.js"

const usersRouter = Router()
/************************* Register a new User Route  *************************/
usersRouter.post("/register", async(req, res, next) => {

    try {
        const newUser = new UsersModel(req.body)
        const {_id} = await newUser.save()
        res.status(201).send({_id:_id})
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
export default usersRouter