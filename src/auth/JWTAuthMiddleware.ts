import createError from "http-errors";
import { verifyJWTToken } from "./tools";
import { Request, Response, NextFunction } from "express";

export const JWTAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    next(
      createError(401, "Please provide bearer token in authorization headers")
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const payload: any = await verifyJWTToken(token);
      req.user = {
        _id: payload._id,
        role: payload.role,
      };
      next();
    } catch (error) {
      console.log(error);
      next(createError(401, "Token is not valid"));
    }
  }
};
