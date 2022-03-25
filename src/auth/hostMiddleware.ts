import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const hostMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "host") {
    next();
  } else {
    next(createError(403, "only host is allowed to post a place"));
  }
};
