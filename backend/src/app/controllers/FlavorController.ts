import { Request, Response } from "express";
import { ResponseStatus } from "../enum/ResponseStatus";
import { Flavor } from "../models/Flavor";
import { FlavorService } from "../services/FlavorService";

class FlavorController {

  private _flavorService = new FlavorService();

  async getAll(res: Response): Promise<Response | undefined> {
    try {
      const flavors = await this._flavorService.getAll();

      return res.json(flavors);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const id = parseInt(req.query.id as string);

      const flavors = await this._flavorService.getById(id);

      return res.json(flavors);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async save(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._flavorService.save(req.body as Flavor);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._flavorService.update(req.body as Flavor);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const id = parseInt(req.query.id as string);
      const result = await this._flavorService.delete(id);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }
}

export default new FlavorController();
