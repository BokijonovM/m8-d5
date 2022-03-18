import createError from "http-errors"


export const hostMiddleware = (req, res, next) => {
    if(req.user.role === "host"){
        next()
    } else {
        next(createError(403, "only host is allowed to post a place"))
    }
}