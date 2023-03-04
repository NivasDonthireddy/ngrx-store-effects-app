import { Action } from "@ngrx/store";

import { Pizza } from "../../models/pizza.model";

// load pizzas
export const LOAD_PIZZAS = "[Products] Load Pizzas";
export const LOAD_PIZZAS_FAIL = "[Products] Load Pizzas Fail";
export const LOAD_PIZZAS_SUCCESS = "[Products] Load Pizzas Success";

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

// create pizza
export const CREATE_PIZZA = "[Products] Create Pizza";
export const CREATE_PIZZA_FAIL = "[Products] Create Pizza Fail";
export const CREATE_PIZZA_SUCCESS = "[Products] Create Pizza Success";

export class createPizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: any) {}
}

export class createPizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class createPizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: any) {}
}

// update pizza
export const UPDATE_PIZZA = "[Products] Update Pizza";
export const UPDATE_PIZZA_FAIl = "[Products] Update Pizza Fail";
export const UPDATE_PIZZA_SUCCESS = "[Products] Update Pizza Success";

export class updatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class updatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIl;
  constructor(public payload: any) {}
}

export class updatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// remove pizza
export const REMOVE_PIZZA = "[Products] Remove Pizza";
export const REMOVE_PIZZA_SUCCESS = "[Products] Remove Pizza Success";
export const REMOVE_PIZZA_FAIL = "[Products] Remove Pizza Fail";

export class removePizza implements Action {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class removePizzaSuccess implements Action {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class removePizzaFail implements Action {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

// action types
export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | createPizza
  | createPizzaFail
  | createPizzaSuccess
  | updatePizza
  | updatePizzaFail
  | updatePizzaSuccess
  | removePizza
  | removePizzaFail
  | removePizzaSuccess;
