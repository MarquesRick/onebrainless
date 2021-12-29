import { Size } from "../models/Size";
import { SizeRepository } from "../repositories/SizeRepository";

interface ISizeService {
  getAll(): Promise<Size[]>;
  getById(id: number): Promise<Size | null>;
  save(size: Size): Promise<number>;
  update(size: Size): Promise<Size>;
  delete(id: number): Promise<string>;
}

export class SizeService implements ISizeService{
  private _sizeRepository = new SizeRepository();

  async delete(id: number): Promise<string> {
    return await this._sizeRepository.delete(id);
  }

  async update(size: Size): Promise<Size> {
    return await this._sizeRepository.update(size);
  }

  async save(size: Size): Promise<number> {
    return await this._sizeRepository.save(size);
  }

  async getById(idUser: number): Promise<Size | null> {
    const size = await this._sizeRepository.getById(idUser);

    return size;
  }

  async getAll(): Promise<Size[]> {
    const sizes = await this._sizeRepository.getAll();

    return sizes;
  }

}
