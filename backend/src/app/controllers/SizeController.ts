import { Request, Response } from "express";
import { ResponseStatus } from "../enum/ResponseStatus";
import { Size } from "../models/Size";
import { SizeService } from "../services/SizeService";

class SizeController {

  private _sizeService = new SizeService();

  async getAll(res: Response): Promise<Response | undefined> {
    try {
      const sizes = await this._sizeService.getAll();

      return res.json(sizes);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async getById(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const id = parseInt(req.query.id as string);

      const sizes = await this._sizeService.getById(id);

      return res.json(sizes);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async save(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._sizeService.save(req.body as Size);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const result = await this._sizeService.update(req.body as Size);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    try {

      const id = parseInt(req.query.id as string);
      const result = await this._sizeService.delete(id);

      return res.json(result);
    } catch (err) {
      res.sendStatus(ResponseStatus.BadRequest);
      console.log(err);
    }
  }
}

export default new SizeController();
