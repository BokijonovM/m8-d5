import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    next(createError(403, "only host is allowed to post a place"));
  }
};
