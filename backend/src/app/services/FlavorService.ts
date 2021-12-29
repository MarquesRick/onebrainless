import { Flavor } from "../models/Flavor";
import { FlavorRepository } from "../repositories/FlavorRepository";

interface IFlavorService {
  getAll(): Promise<Flavor[]>;
  getById(id: number): Promise<Flavor | null>;
  save(flavor: Flavor): Promise<number>;
  update(flavor: Flavor): Promise<Flavor>;
  delete(id: number): Promise<string>;
}

export class FlavorService implements IFlavorService{
  private _flavorRepository = new FlavorRepository();

  async delete(id: number): Promise<string> {
    return await this._flavorRepository.delete(id);
  }

  async update(flavor: Flavor): Promise<Flavor> {
    return await this._flavorRepository.update(flavor);
  }

  async save(flavor: Flavor): Promise<number> {
    return await this._flavorRepository.save(flavor);
  }

  async getById(idUser: number): Promise<Flavor | null> {
    const flavors = await this._flavorRepository.getById(idUser);

    return flavors;
  }

  async getAll(): Promise<Flavor[]> {
    const flavors = await this._flavorRepository.getAll();

    return flavors;
  }

}
