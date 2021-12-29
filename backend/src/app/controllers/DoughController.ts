import { Request, Response } from "express";
import { ResponseStatus } from "../enum/ResponseStatus";
import { Dough } from "../models/Dough";
import { DoughService } from "../services/DoughService";

class DoughController {

  private _doughService = new DoughService();

  async getAll(res: Response): Promise<Response | undefined> {
    try {
      const doughs = await this._doughService.getAll();

      return res.json(doughs);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const id = parseInt(req.query.id as string);

      const doughs = await this._doughService.getById(id);

      return res.json(doughs);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async save(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._doughService.save(req.body as Dough);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._doughService.update(req.body as Dough);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const id = parseInt(req.query.id as string);
      const result = await this._doughService.delete(id);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }
}

export default new DoughController();
