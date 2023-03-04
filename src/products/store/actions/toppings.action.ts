import { Action } from "@ngrx/store";
import { Topping } from "../../models/topping.model";

// load toppings
export const LOAD_TOPPINGS = "[Products] Load Toppings";
export const LOAD_TOPPINGS_FAIL = "[Products] Load Toppings Fail";
export const LOAD_TOPPINGS_SUCCESS = "[Products] Load Toppings Success";
export const VISUALIZE_TOPPINGS = "[Products] Visualize Toppings";

export class Visualize_Toppings implements Action {
  readonly type = VISUALIZE_TOPPINGS;
  constructor(public payload: number[]) {}
}

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
  constructor() {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export type ToppingsActions =
  | LoadToppings
  | LoadToppingsSuccess
  | LoadToppingsFail
  | Visualize_Toppings;
