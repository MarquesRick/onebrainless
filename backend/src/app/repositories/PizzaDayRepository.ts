import axios from "axios";
import { BASE_URL_JSON_SERVER } from "../../connections/requests";
import { PizzaDay } from "../models/PizzaDay";

interface IPizzaDayRepository{
  getAll(): Promise<PizzaDay[]>;
  getById(id: number): Promise<PizzaDay[]>;
  getByWeekDay(day: string): Promise<PizzaDay>;
  save(pizzaDay: PizzaDay): Promise<number>;
  update(pizzaDay: PizzaDay): Promise<PizzaDay>;
  delete(id: number): Promise<string>;
}

export class PizzaDayRepository implements IPizzaDayRepository {
  async getByWeekDay(day: string): Promise<PizzaDay> {
    const result = await axios
      .get<PizzaDay[]>(`${BASE_URL_JSON_SERVER}/pizzaDay?dayOfWeek=${day}`)
      .then((response) => response.data);

    return result[0];
  }
  async delete(id: number): Promise<string> {
    const result = await axios
      .delete(`${BASE_URL_JSON_SERVER}/pizzaDay/${id}`)
      .then(() => {return 'success'})
      .catch(() => {return 'error'});

      return result;
  }
  async update(pizzaDay: PizzaDay): Promise<PizzaDay> {
    const result = await axios
      .put<PizzaDay>(`${BASE_URL_JSON_SERVER}/pizzaDay/${pizzaDay.id}`, pizzaDay)
      .then((response) => response.data);

      return result;
  }

  async save(pizzaDay: PizzaDay): Promise<number> {
    let newId = 0;
    await axios
      .post(`${BASE_URL_JSON_SERVER}/pizzaDay`, pizzaDay)
      .then((response) => {
        newId = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

    return newId;
  }
  async getAll(): Promise<PizzaDay[]> {
    const result = await axios
      .get<PizzaDay[]>(`${BASE_URL_JSON_SERVER}/pizzaDay`)
      .then((response) => response.data);

    return result;
  }

  async getById(id: number): Promise<PizzaDay[]> {
    const result = await axios
      .get<PizzaDay[]>(`${BASE_URL_JSON_SERVER}/pizzaDay/${id}`)
      .then((response) => response.data);

    return result;
  }
}
