import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CartItem } from '../../state/cart/cart-state';
import { removeFromCart, clearCart } from '../../state/cart/cart.actions';
import { selectCartItems, selectCartItemCount } from '../../state/cart/cart.selector';

@Component({
  selector: 'app-cart',
  standalone: false,

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems$;
  totalItems$;

  constructor(private store: Store<{ cart: { items: CartItem[] } }>) {
    this.cartItems$ = this.store.pipe(select(selectCartItems));
    this.totalItems$ = this.store.pipe(select(selectCartItemCount));
  }

  removeItem(pokemonName: string): void {
    this.store.dispatch(removeFromCart({ pokemonName }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

}
