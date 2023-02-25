import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { ToppingsService } from "../../services/toppings.service";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap } from "rxjs/operators";
import * as toppingsActions from "../actions/index";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingService: ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService.getToppings().pipe(
        map((toppings) => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError((err) => of(new toppingsActions.LoadToppingsFail(err)))
      );
    })
  );
}
