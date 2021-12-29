import { Request, Response } from "express";
import { ResponseStatus } from "../enum/ResponseStatus";
import { PizzaDay } from "../models/PizzaDay";
import { PizzaDayService } from "../services/PizzaDayService";

class PizzaDayController {

  private _pizzaDayService = new PizzaDayService();

  async getAll(res: Response): Promise<Response | undefined> {
    try {
      const pizzasDay = await this._pizzaDayService.getAll();

      return res.json(pizzasDay);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const id = parseInt(req.query.id as string);

      const pizzasDay = await this._pizzaDayService.getById(id);

      return res.json(pizzasDay);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getByWeekDay(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const dayOfWeek = req.query.dayOfWeek as string;

      const pizzaDay = await this._pizzaDayService.getByWeekDay(dayOfWeek);

      return res.json(pizzaDay);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async save(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._pizzaDayService.save(req.body as PizzaDay);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._pizzaDayService.update(req.body as PizzaDay);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const id = parseInt(req.query.id as string);
      const result = await this._pizzaDayService.delete(id);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }
}

export default new PizzaDayController();
