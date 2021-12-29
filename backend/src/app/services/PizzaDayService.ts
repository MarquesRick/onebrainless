import { PizzaDay } from "../models/PizzaDay";
import { PizzaDayRepository } from "../repositories/PizzaDayRepository";

interface IPizzaDayService {
  getAll(): Promise<PizzaDay[]>;
  getById(id: number): Promise<PizzaDay[]>;
  getByWeekDay(day: string): Promise<PizzaDay>;
  save(pizzaDay: PizzaDay): Promise<number>;
  update(pizzaDay: PizzaDay): Promise<PizzaDay>;
  delete(id: number): Promise<string>;
}

export class PizzaDayService implements IPizzaDayService{
  private _pizzaDayRepository = new PizzaDayRepository();

  async getByWeekDay(day: string): Promise<PizzaDay> {
    return await this._pizzaDayRepository.getByWeekDay(day);
  }

  async delete(id: number): Promise<string> {
    return await this._pizzaDayRepository.delete(id);
  }

  async update(pizzaDay: PizzaDay): Promise<PizzaDay> {
    return await this._pizzaDayRepository.update(pizzaDay);
  }

  async save(pizzaDay: PizzaDay): Promise<number> {
    return await this._pizzaDayRepository.save(pizzaDay);
  }

  async getById(idUser: number): Promise<PizzaDay[]> {
    const pizzasDay = await this._pizzaDayRepository.getById(idUser);

    return pizzasDay;
  }

  async getAll(): Promise<PizzaDay[]> {
    const pizzasDay = await this._pizzaDayRepository.getAll();

    return pizzasDay;
  }

}
