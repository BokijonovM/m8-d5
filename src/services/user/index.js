import express, {Router} from "express";
import UsersModel from "./user-schema.js"

const usersRouter = Router()
/************************* Get User Route  *************************/
usersRouter.post("/register", async(req, res, next) => {

    try {
        const newUser = new UsersModel(req.body)
        const {_id} = await newUser.save()
        res.status(201).send({_id:_id})
    } catch (error) {
        next(error)
    }

})
export default usersRouter