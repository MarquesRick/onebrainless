import { Dough } from "../models/Dough";
import { DoughRepository } from "../repositories/DoughRepository";

interface IDoughService {
  getAll(): Promise<Dough[]>;
  getById(id: number): Promise<Dough | null>;
  save(dough: Dough): Promise<number>;
  update(dough: Dough): Promise<Dough>;
  delete(id: number): Promise<string>;
}

export class DoughService implements IDoughService{
  private _doughRepository = new DoughRepository();

  async delete(id: number): Promise<string> {
    return await this._doughRepository.delete(id);
  }

  async update(dough: Dough): Promise<Dough> {
    return await this._doughRepository.update(dough);
  }

  async save(dough: Dough): Promise<number> {
    return await this._doughRepository.save(dough);
  }

  async getById(idUser: number): Promise<Dough | null> {
    const dough = await this._doughRepository.getById(idUser);

    return dough;
  }

  async getAll(): Promise<Dough[]> {
    const doughs = await this._doughRepository.getAll();

    return doughs;
  }

}
