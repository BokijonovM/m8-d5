import createError from "http-errors";
import { verifyJWTToken } from "./tools";

export const JWTAuthMiddleware = async(req, res, next) => {
    console.log(req.headers);
    if(!req.headers.authorization){
        next(createError(401, "Please provide bearer token in authorization headers"))
    }else {
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const payload = await verifyJWTToken(token)
            req.user = {
                _id : payload._id,
                role : payload.role
            }
            next()
        } catch (error) {
            console.log(error)
            next(createError(401,"Token is not valid"))
        }
    }
}