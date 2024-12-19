import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon.services';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { CartItem } from '../../state/cart/cart-state';
import { clearCart } from '../../state/cart/cart.actions';
import { selectCartItems } from '../../state/cart/cart.selector';

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems$: Observable<CartItem[]>;
  cartItems: CartItem[] = [];
  formSubmitted = false;
  checkoutForm: FormGroup;
  evolutionOptions: Record<string, any[]> = {};
  displayedPokemons: any[][] = [];

  countries = [
    { code: '+1', name: '🇺🇸' },
    { code: '+62', name: '🇮🇩' },
    { code: '+44', name: '🇬🇧' },
  { code: '+91', name: '🇮🇳' },
  { code: '+86', name: '🇨🇳' },
  { code: '+81', name: '🇯🇵' },
  { code: '+49', name: '🇩🇪' },
  { code: '+33', name: '🇫🇷' },
  { code: '+39', name: '🇮🇹' },
  { code: '+61', name: '🇦🇺' },
  { code: '+7', name: '🇷🇺' },
  { code: '+34', name: '🇪🇸' },
  ];

  constructor(
    private store: Store<{ cart: CartItem[] }>,
    private dbService: RealtimeDatabaseService,
    private fb: FormBuilder,
    private pokemonService: PokemonService
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCountryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      pokemonSelections: this.fb.array([]),
    });
  }

  get pokemonSelections(): FormArray<FormGroup> {
    return this.checkoutForm.get('pokemonSelections') as FormArray<FormGroup>;
  }

  async ngOnInit(): Promise<void> {
    this.cartItems$.subscribe(async (items) => {
      if (!items || items.length === 0) {
        console.warn('Cart is empty.');
        this.cartItems = [];
        return;
      }

      this.cartItems = items;
      await this.initializeEvolutionOptions();
    });
  }

  private async initializeEvolutionOptions(): Promise<void> {
    for (const item of this.cartItems) {
      try {
        const species = await this.pokemonService.getPokemoneSpecies(
          item.pokemon.name
        );
        const evolutionChainUrl = species.evolution_chain.url;
        const evolutionChain =
          await this.pokemonService.getPokeomenEvolve(evolutionChainUrl);

        this.evolutionOptions[item.pokemon.name] = evolutionChain;

        this.pokemonSelections.push(
          this.fb.group({
            buyOption: ['1', Validators.required], // Default to "Buy 1"
            quantity: [item.quantity, Validators.required], // Initial quantity
          })
        );

        // Replicate the initial Pokémon display based on the quantity
        const replicatedPokemon = [];
        for (let i = 0; i < item.quantity; i++) {
          replicatedPokemon.push(item.pokemon);
        }

        this.displayedPokemons.push(replicatedPokemon);
      } catch (error) {
        console.error(
          `Error loading evolution options for ${item.pokemon.name}`,
          error
        );
      }
    }
  }

  updateDisplayedPokemons(index: number): void {
    const buyOption = this.pokemonSelections.at(index).get('buyOption')?.value;

    const baseQuantity = this.cartItems[index].quantity;
    const selectedPokemon =
      buyOption === '1'
        ? [this.cartItems[index].pokemon]
        : this.evolutionOptions[this.cartItems[index].pokemon.name];

    // Update displayed Pokémon: replicate each selected Pokémon by baseQuantity
    const replicatedPokemon = [];
    for (let i = 0; i < baseQuantity; i++) {
      replicatedPokemon.push(...selectedPokemon);
    }
    this.displayedPokemons[index] = replicatedPokemon;

    // Update quantity to match the total number of displayed Pokémon
    const totalQuantity = replicatedPokemon.length;

    this.pokemonSelections.at(index).patchValue({
      quantity: totalQuantity,
    });
  }

  async submitOrder(): Promise<void> {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formValues = this.checkoutForm.value;

    const pokemonToBuy = this.cartItems.map((item, index) => {
      const buyOption = this.pokemonSelections
        .at(index)
        .get('buyOption')?.value;

      const selectedPokemon =
        buyOption === '1'
          ? [item.pokemon.name]
          : this.evolutionOptions[item.pokemon.name].map((evo) => evo.name);

      return {
        pokemon: selectedPokemon,
        quantity: this.pokemonSelections.at(index).get('quantity')?.value,
      };
    });

    const orderData = {
      ...formValues,
      pokemonToBuy,
    };

    try {
      await this.dbService.saveFormSubmission(orderData);
      this.formSubmitted = true;
      this.store.dispatch(clearCart());
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  }

}
