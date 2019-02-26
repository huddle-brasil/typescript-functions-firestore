import { Request, NextFunction, Response } from "express";

export const middlewareTest = (req: Request, res: Response, next: NextFunction) => {
    console.log("passed on middleware");
    next();
}