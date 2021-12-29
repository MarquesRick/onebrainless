import axios from "axios";
import { BASE_URL_JSON_SERVER } from "../../connections/requests";
import { Size } from "../models/Size";

interface ISizeRepository{
  getAll(): Promise<Size[]>;
  getById(id: number): Promise<Size | null>;
  save(size: Size): Promise<number>;
  update(size: Size): Promise<Size>;
  delete(id: number): Promise<string>;
}

export class SizeRepository implements ISizeRepository {
  async delete(id: number): Promise<string> {
    const result = await axios
      .delete(`${BASE_URL_JSON_SERVER}/size/${id}`)
      .then(() => {return 'success'})
      .catch(() => {return 'error'});

      return result;
  }
  async update(size: Size): Promise<Size> {
    const result = await axios
      .put<Size>(`${BASE_URL_JSON_SERVER}/size/${size.id}`, size)
      .then((response) => response.data);

      return result;
  }

  async save(size: Size): Promise<number> {
    let newId = 0;
    await axios
      .post(`${BASE_URL_JSON_SERVER}/size`, size)
      .then((response) => {
        newId = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

    return newId;
  }
  async getAll(): Promise<Size[]> {
    const result = await axios
      .get<Size[]>(`${BASE_URL_JSON_SERVER}/size`)
      .then((response) => response.data);

    return result;
  }

  async getById(id: number): Promise<Size | null> {
    const result = await axios
      .get<Size[]>(`${BASE_URL_JSON_SERVER}/size?id=${id}`)
      .then((response) => response.data);

    return result[0];
  }
}
