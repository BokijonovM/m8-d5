import createError from "http-errors";
import { Router, Request, Response, NextFunction } from "express";
import { UserRole } from "../types";

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
