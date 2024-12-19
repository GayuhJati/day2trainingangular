import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.services';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/cart/cart.actions';



@Component({
  selector: 'app-pokemon-go',
  standalone: false,

  templateUrl: './pokemon-go.component.html',
  styleUrl: './pokemon-go.component.css',
})
export class PokemonGoComponent implements OnInit {
isModalOpen: boolean=false;


  openModalBuy() {
    this.isModalOpen = true;
  }

  hearCry(url: string) {
    const audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
  pokemon: any = null;
  evolutionChain: any[] =[];
  selectedEvolve: any = "";
  currentEvolutionIndex: number = 0;
  pokemonCryUrl: string | null = null;
  selectedButton: string | null = null;
  isDrawerOpen: boolean = false;
  showSuccessModal: boolean = false;

  onSelectButton(name: string): void {
    this.selectedButton = name;
  }

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      await this.loadPokemonDetails(name);
    }
  }

  selectedEvolvePage(name: string){
    if (name){
      this.loadPokemonDetails(name);
    }
  }


  private async loadPokemonDetails(name: string): Promise<void>{
    this.selectedButton = name;
    try{
      this.pokemon = await  this.pokemonService.getPokemonById(name);
      console.log(this.pokemon.name);
      if(this.pokemon){
        const species = await this.pokemonService.getPokemoneSpecies(this.pokemon.name);
        const evolutionChainUrl = species.evolution_chain.url;
        const [evolutionChain] = await Promise.all([this.pokemonService.getPokeomenEvolve(evolutionChainUrl)]);
        this.evolutionChain = evolutionChain;
        this.currentEvolutionIndex = this.evolutionChain.findIndex((evo) => evo.name==this.pokemon.name);

        if (this.pokemon.cries && this.pokemon.cries.latest){
          this.pokemonCryUrl = this.pokemon.cries.latest.url;
        }else{
          this.pokemonCryUrl = null;
        }
      }
    }catch(error){
      console.log(error);
    }
  }

  async evolve(): Promise<void>{
    if(this.currentEvolutionIndex + 1 < this.evolutionChain.length){
      this.currentEvolutionIndex++;
      this.pokemon = await this.pokemonService.getPokemonById(this.evolutionChain[this.currentEvolutionIndex].name);

      const species = await this.pokemonService.getPokemoneSpecies(this.pokemon.name);
      const evolutionChainUrl = species.evolution_chain.url;
      const [evolutionChain] = await Promise.all([this.pokemonService.getPokeomenEvolve(evolutionChainUrl)]);
      this.evolutionChain = evolutionChain;

      if (this.pokemon.cries && this.pokemon.cries.latest){
        this.pokemonCryUrl = this.pokemon.cries.latest.url;
      }else{
        this.pokemonCryUrl = null;
      }
    }
  }

  async devolve(): Promise<void>{
    if(this.currentEvolutionIndex > 0){
      this.currentEvolutionIndex--;
      this.pokemon = await this.pokemonService.getPokemonById(this.evolutionChain[this.currentEvolutionIndex].name);

      const species = await this.pokemonService.getPokemoneSpecies(this.pokemon.name);
      const evolutionChainUrl = species.evolution_chain.url;
      const [evolutionChain] = await Promise.all([this.pokemonService.getPokeomenEvolve(evolutionChainUrl)]);
      this.evolutionChain = evolutionChain;

      if (this.pokemon.cries && this.pokemon.cries.latest){
        this.pokemonCryUrl = this.pokemon.cries.latest.url;
      }else{
        this.pokemonCryUrl = null;
      }
    }
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  openSuccessModal(): void {
    this.showSuccessModal = true;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  navigateToSubmission(): void {
    this.router.navigate(['/submission']);
  }

  addToCart(pokemon: any): void {
    const cartItem = { pokemon, quantity: 1 };
    alert(`Pokemon ${cartItem.pokemon.name} has been added to your cart!`);
    this.store.dispatch(addToCart(cartItem));
  }

}
