import axios from "axios";
import { BASE_URL_JSON_SERVER } from "../../connections/requests";
import { Order } from "../models/Order";

interface IOrderRepository {
  getAll(): Promise<Order[]>;
  getByUser(idUser: number): Promise<Order[]>;
  save(order: Order): Promise<number>;
  update(order: Order): Promise<Order>;
  delete(id: number): Promise<string>;
}

export class OrderRepository implements IOrderRepository {
  async delete(id: number): Promise<string> {
    const result = await axios
      .delete(`${BASE_URL_JSON_SERVER}/order/${id}`)
      .then(() => {return 'success'})
      .catch(() => {return 'error'});

      return result;
  }
  async update(order: Order): Promise<Order> {
    const response = await axios
      .put<Order>(`${BASE_URL_JSON_SERVER}/order/${order.id}`, order)
      .then((response) => response.data);

      return response;
  }

  async save(order: Order): Promise<number> {
    let newId = 0;
    await axios
      .post(`${BASE_URL_JSON_SERVER}/order`, order)
      .then((response) => {
        newId = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

    return newId;
  }
  async getAll(): Promise<Order[]> {
    const response = await axios
      .get<Order[]>(`${BASE_URL_JSON_SERVER}/order`)
      .then((response) => response.data);

    return response;
  }

  async getByUser(idUser: number): Promise<Order[]> {
    const response = await axios
      .get<Order[]>(`${BASE_URL_JSON_SERVER}/order?user.id=${idUser}`)
      .then((response) => response.data);

    return response;
  }
}
