import { NextFunction, Request, Response } from "express";
import Utils from "../utils/utils";
import Socket from "../base/classes/Socket";
import visit from "../models/visit";
import HttpResponse from "../base/classes/HttpResponse";
import IVisit from "../base/interfaces/IVisit";

class MainController {
  public static async logVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { ip: ipAddress, headers } = req;

    const ip = headers["cf-connecting-ip"] || ipAddress;

    const userAgent = headers["user-agent"];
    const browser = userAgent?.includes("Chrome")
      ? "Google Chrome"
      : userAgent?.includes("Firefox")
      ? "Mozilla Firefox"
      : "Не определено";

    const date = new Date();
    const stringDate = Utils.formatDate(date);

    Socket.send("NewVisit", <IVisit>{
      Ip: ip,
      Browser: browser,
      Date: stringDate,
    });

    await visit.create({
      ip,
      browser,
      date,
    });

    res.json(
      new HttpResponse({
        status: 200,
        message: "Ну это типа вебсите пумк пумк",
      })
    );
  }
}

export default MainController;
