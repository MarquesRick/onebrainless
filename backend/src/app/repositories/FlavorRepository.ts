import axios from "axios";
import { BASE_URL_JSON_SERVER } from "../../connections/requests";
import { Flavor } from "../models/Flavor";

interface IFlavorRepository{
  getAll(): Promise<Flavor[]>;
  getById(id: number): Promise<Flavor | null>;
  save(flavor: Flavor): Promise<number>;
  update(flavor: Flavor): Promise<Flavor>;
  delete(id: number): Promise<string>;
}

export class FlavorRepository implements IFlavorRepository {
  async delete(id: number): Promise<string> {
    const result = await axios
      .delete(`${BASE_URL_JSON_SERVER}/flavor/${id}`)
      .then(() => {return 'success'})
      .catch(() => {return 'error'});

      return result;
  }
  async update(flavor: Flavor): Promise<Flavor> {
    const result = await axios
      .put<Flavor>(`${BASE_URL_JSON_SERVER}/flavor/${flavor.id}`, flavor)
      .then((response) => response.data);

      return result;
  }

  async save(flavor: Flavor): Promise<number> {
    let newId = 0;
    await axios
      .post(`${BASE_URL_JSON_SERVER}/flavor`, flavor)
      .then((response) => {
        newId = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

    return newId;
  }
  async getAll(): Promise<Flavor[]> {
    const result = await axios
      .get<Flavor[]>(`${BASE_URL_JSON_SERVER}/flavor`)
      .then((response) => response.data);

    return result;
  }

  async getById(id: number): Promise<Flavor | null> {
    const result = await axios
      .get<Flavor[]>(`${BASE_URL_JSON_SERVER}/flavor?id=${id}`)
      .then((response) => response.data);

    return result[0];
  }
}
