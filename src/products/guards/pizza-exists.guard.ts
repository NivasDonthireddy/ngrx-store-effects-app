import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { filter, tap, switchMap, map, take } from "rxjs/operators";
import * as fromStore from "../store";

import { Pizza } from "../models/pizza.model";
import { of } from "rxjs/observable/of";

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId);
        return of(true);
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzasEntities).pipe(
      map((entities: { [key: number]: Pizza }) => {
        console.log(entities);
        return !!entities[id];
      }),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter((loaded) => {
        return loaded;
      }),
      take(1)
    );
  }
}
