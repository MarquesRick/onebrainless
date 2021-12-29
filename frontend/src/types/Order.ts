import { Dough } from './Dough';
import { Flavor } from './Flavor';
import { Size } from './Size';
import { User } from './User';

export interface Order {
  id?: number;
  user: User;
  flavor: Flavor;
  dough: Dough;
  size: Size;
  totalPrice: number;
  createdAt: string;
  estimatedDelivery: string;
}
