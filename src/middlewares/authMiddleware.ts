import { NextFunction, Request, Response } from "express";
import HttpResponse from "../base/classes/HttpResponse";

export default (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;

    const userAgent = headers["user-agent"];
    if (userAgent !== "CABClient") {
        res.json(new HttpResponse({ status: 401, message: "Не авторизован!" }));

        return;
    }

    next();
};
