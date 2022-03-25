import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types";

export interface IRequestWithUser extends Request {
  user: IUser;
}
export const adminMiddleware = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next(createError(403, "only host is allowed to post a place"));
  }
};
