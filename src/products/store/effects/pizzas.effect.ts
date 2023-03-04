import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as pizzaActions from "../actions/pizzas.action";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { PizzasService } from "../../services/pizzas.service";
import { Pizza } from "src/products/models/pizza.model";

import * as fromRoot from "../../../app/store";
@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.createPizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.createPizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.createPizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.createPizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.createPizzaSuccess) => action.payload),
      map((pizza) => {
        return new fromRoot.Go({
          path: ["/products", pizza.id],
        });
      })
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.updatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.updatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.updatePizzaFail(error)))
      );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map((pizza) => {
        return new fromRoot.Go({
          path: ["/products"],
        });
      })
    );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.removePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new pizzaActions.removePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.removePizzaFail(error)))
      );
    })
  );
}
