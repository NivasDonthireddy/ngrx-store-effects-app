import { Component, OnInit } from "@angular/core";
import { Pizza } from "../../models/pizza.model";
import { Topping } from "../../models/topping.model";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromStore from "../../store";
import { tap } from "rxjs/operators";

@Component({
  selector: "product-item",
  styleUrls: ["product-item.component.scss"],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        // '/products/new'
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings.map((topping) => topping.id)
          : [];
        this.store.dispatch(new fromStore.Visualize_Toppings(toppings));
      })
    );
    this.toppings$ = this.store.select<any>(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.Visualize_Toppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.createPizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.updatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm("Are you sure?");
    if (remove) {
      this.store.dispatch(new fromStore.removePizza(event));
    }
  }
}
