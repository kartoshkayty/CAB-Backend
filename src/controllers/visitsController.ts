import { NextFunction, Request, Response } from "express";
import HttpResponse from "../base/classes/HttpResponse";
import visit from "../models/visit";
import IVisit from "../base/interfaces/IVisit";
import Utils from "../utils/utils";

class VisitsController {
  public static async last(req: Request, res: Response, next: NextFunction) {
    const lastVisit = await visit.findOne().sort({ date: -1 });

    if (!lastVisit) {
      res.json(new HttpResponse({ status: 404, message: "Не найдено" }));

      return;
    }

    const date = new Date(lastVisit.date);
    const stringDate = Utils.formatDate(date);

    res.json(
      new HttpResponse({
        status: 200,
        message: "Успешно",
        content: <IVisit>{
          Ip: lastVisit.ip,
          Browser: lastVisit.browser,
          Date: stringDate,
        },
      })
    );
  }

  public static async visitsYear(
    req: Request<{ year: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { params } = req;

    const startDate = new Date(params.year);
    const endDate = new Date(startDate).setUTCFullYear(
      startDate.getUTCFullYear() + 1
    );

    const visits = await visit
      .find({ date: { $gte: startDate, $lt: endDate } })
      .countDocuments();

    res.json(
      new HttpResponse({ status: 200, message: "Успешно", content: visits })
    );
  }

  public static async visitsTime(
    req: Request<any, any, { startTime: string; endTime: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;

    const [startHours, startMinutes] = body.startTime.split(":");
    const [endHours, endMinutes] = body.endTime.split(":");

    const startDate = new Date().setUTCHours(
      parseInt(startHours),
      parseInt(startMinutes)
    );
    const endDate = new Date().setUTCHours(
      parseInt(endHours),
      parseInt(endMinutes)
    );

    if (isNaN(startDate) || isNaN(endDate)) {
      res.json(
        new HttpResponse({ status: 400, message: "Не правильно указан body!" })
      );

      return;
    }

    const visits = await visit
      .find({ date: { $gte: startDate, $lt: endDate } })
      .sort({ date: -1 });

    if (visit.length == 0) {
      res.json(new HttpResponse({ status: 404, message: "Не найдено" }));

      return;
    }

    const content = visits.map((visit) => {
      return <IVisit>{
        Ip: visit.ip,
        Browser: visit.browser,
        Date: Utils.formatDate(visit.date),
      };
    });

    res.json(new HttpResponse({ status: 200, message: "Успешно", content }));
  }

  public static async all(req: Request, res: Response, next: NextFunction) {
    const allVisits = await visit.find().sort({ date: -1 });

    const visits = allVisits.map((visit) => {
      return <IVisit>{
        Ip: visit.ip,
        Browser: visit.browser,
        Date: `${visit.date.getUTCDay()}`,
      };
    });

    if (visits.length == 0) {
      res.json(new HttpResponse({ status: 404, message: "Не найдено" }));

      return;
    }

    res.json(
      new HttpResponse({ status: 200, message: "Успешно", content: visits })
    );
  }

  public static async findDate(
    req: Request<{ date: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { params } = req;
    const [day, mouth, year] = params.date.split("-");

    const date = new Date(`${year}-${mouth}-${day}`);

    if (isNaN(date.getDay())) {
      res.json(
        new HttpResponse({ status: 400, message: "Неправильно указана дата!" })
      );

      return;
    }

    const startDate = new Date(date).setUTCHours(0, 0, 0, 0);
    const endDate = new Date(date).setUTCHours(23, 59, 59, 999);

    const Visit = await visit
      .findOne({ date: { $gte: startDate, $lt: endDate } })
      .sort({ date: -1 });

    if (!Visit) {
      res.json(new HttpResponse({ status: 404, message: "Не найдено" }));

      return;
    }

    const stringDate = Utils.formatDate(Visit.date);

    res.json(
      new HttpResponse({
        status: 200,
        message: "Успешно",
        content: <IVisit>{
          Ip: Visit.ip,
          Browser: Visit.browser,
          Date: stringDate,
        },
      })
    );
  }
}

export default VisitsController;
