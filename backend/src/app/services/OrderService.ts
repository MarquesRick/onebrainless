import { Dough } from "../models/Dough";
import { Flavor } from "../models/Flavor";
import { Order } from "../models/Order";
import { Size } from "../models/Size";
import { User } from "../models/User";
import { DoughRepository } from "../repositories/DoughRepository";
import { FlavorRepository } from "../repositories/FlavorRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { SizeRepository } from "../repositories/SizeRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IOrderService {
  getAll(): Promise<Order[]>;
  getByUser(idUser: number): Promise<Order[]>;
  save(order: Order): Promise<number>;
  update(order: Order): Promise<Order>;
  delete(id: number): Promise<string>;
}

export class OrderService implements IOrderService {
  private _orderRepository = new OrderRepository();
  private _userRepository = new UserRepository();
  private _flavorRepository = new FlavorRepository();
  private _doughRepository = new DoughRepository();
  private _sizeRepository = new SizeRepository();

  async delete(id: number): Promise<string> {
    return await this._orderRepository.delete(id);
  }

  async update(order: Order): Promise<Order> {
    return await this._orderRepository.update(order);
  }

  async save(order: Order): Promise<number> {

    const { id } = order.user;
    const flavorId = order.flavor.id;
    const doughId = order.dough.id;
    const sizeId = order.size.id;

    const user = await this._userRepository.getUserById(id);

    const flavor = await this._flavorRepository.getById(flavorId);

    const dough = await this._doughRepository.getById(doughId);

    const size = await this._sizeRepository.getById(sizeId);

    const orderSave: Order = {
      user: user as User,
      flavor: flavor as Flavor,
      dough: dough as Dough,
      size: size as Size,
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
      estimatedDelivery: order.estimatedDelivery
    }

    return await this._orderRepository.save(orderSave);
  }

  async getByUser(idUser: number): Promise<Order[]> {
    const orders = await this._orderRepository.getByUser(idUser);

    return orders;
  }

  async getAll(): Promise<Order[]> {
    const orders = await this._orderRepository.getAll();

    return orders;
  }

}
