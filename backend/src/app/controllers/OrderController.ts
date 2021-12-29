import { Request, Response } from "express";
import { ResponseStatus } from "../enum/ResponseStatus";
import { Order } from "../models/Order";
import { OrderService } from "../services/OrderService";

class OrderController {

  private _orderService = new OrderService();

  async getAll(res: Response): Promise<Response | undefined> {
    try {
      const orders = await this._orderService.getAll();

      return res.json(orders);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getByUser(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const idUser = parseInt(req.query.idUser as string);

      const orders = await this._orderService.getByUser(idUser);

      return res.json(orders);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async save(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._orderService.save(req.body as Order);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._orderService.update(req.body as Order);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const id = parseInt(req.query.id as string);
      const result = await this._orderService.delete(id);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }
}

export default new OrderController();
