import createError from "http-errors"


export const adminMiddleware = (req, res, next) => {
    if(req.user.role === "admin"){
        next()
    } else {
        next(createError(403, "only host is allowed to post a place"))
    }
}