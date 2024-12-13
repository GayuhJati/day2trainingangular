import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.services';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,

  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})

export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {
  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  paginatedPokemon: any[] = [];
  selectedPokemon: any = null;
  theme: 'light' | 'dark' = 'light';
  filter: string = '';
  selectedElement: string = '';
  elements: string[] = ['fire', 'water', 'grass', 'electric', 'ice', 'rock'];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private pokemonService: PokemonService) {
    console.log('constructore called');
  }

  async ngOnInit() {
    console.log('PokemonListComponent: ngOnInit called');
    await this.fetchPokemon();
  }

  async fetchPokemon() {
    const rawPokemonList = await this.pokemonService.getPokemonList(20); // Fetch first 150 Pokémon
    this.pokemonList = await Promise.all(
      rawPokemonList.map(async (pokemon: any) => {
        const details = await this.pokemonService.getPokemonDetail(
          pokemon.url
        );
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: details.sprites.front_default,
          element: details.types[0]?.type?.name, 
        };
      })
    );
    this.filteredPokemon = this.pokemonList;
    this.updatePagination();
  }

  applyFilter() {
    this.filteredPokemon = this.pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(this.filter.toLowerCase());
      const matchesElement =
        !this.selectedElement || pokemon.element === this.selectedElement;
      return matchesName && matchesElement;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(
      this.filteredPokemon.length / this.itemsPerPage
    );
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  async selectPokemon(url: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonDetail(url);
    console
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change initialized")
  }
  ngOnDestroy(): void {
    console.log("destroy start")
  }
}