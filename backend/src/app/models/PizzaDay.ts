import { Dough } from "./Dough";
import { Flavor } from "./Flavor";
import { Size } from "./Size";

export interface PizzaDay{
  id: number;
  dayOfWeek: string;
  flavor: Flavor;
  dough: Dough;
  size: Size;
}
