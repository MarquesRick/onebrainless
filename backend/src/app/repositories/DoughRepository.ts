import axios from "axios";
import { BASE_URL_JSON_SERVER } from "../../connections/requests";
import { Dough } from "../models/Dough";

interface IDoughRepository{
  getAll(): Promise<Dough[]>;
  getById(id: number): Promise<Dough | null>;
  save(dough: Dough): Promise<number>;
  update(dough: Dough): Promise<Dough>;
  delete(id: number): Promise<string>;
}

export class DoughRepository implements IDoughRepository {
  async delete(id: number): Promise<string> {
    const result = await axios
      .delete(`${BASE_URL_JSON_SERVER}/dough/${id}`)
      .then(() => {return 'success'})
      .catch(() => {return 'error'});

      return result;
  }
  async update(dough: Dough): Promise<Dough> {
    const result = await axios
      .put<Dough>(`${BASE_URL_JSON_SERVER}/dough/${dough.id}`, dough)
      .then((response) => response.data);

      return result;
  }

  async save(dough: Dough): Promise<number> {
    let newId = 0;
    await axios
      .post(`${BASE_URL_JSON_SERVER}/dough`, dough)
      .then((response) => {
        newId = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

    return newId;
  }
  async getAll(): Promise<Dough[]> {
    const result = await axios
      .get<Dough[]>(`${BASE_URL_JSON_SERVER}/dough`)
      .then((response) => response.data);

    return result;
  }

  async getById(id: number): Promise<Dough | null> {
    const result = await axios
      .get<Dough[]>(`${BASE_URL_JSON_SERVER}/dough?id=${id}`)
      .then((response) => response.data);

    return result[0];
  }
}
