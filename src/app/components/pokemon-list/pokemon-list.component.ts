import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.services';
import { CardDetailModalComponent } from '../card-detail-modal/card-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { colorMap, PokemonType } from '../constant/pokemon-color';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,

  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})

export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {

  colorMapper: Record<PokemonType, string> = {
    Fire: 'bg-red-500 text-white',
    Water: 'bg-blue-500 text-white',
    Grass: 'bg-green-500 text-white',
    Electric: 'bg-yellow-500 text-black',
    Ice: 'bg-blue-200 text-black',
    Rock: 'bg-gray-500 text-white',
    Flying: 'bg-purple-400 text-white',
    Psychic: 'bg-pink-500 text-white',
    Dark: 'bg-gray-800 text-white',
    Fairy: 'bg-pink-300 text-black',
  };
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
  isLoading: boolean = true;

  colorMap = this.colorMapper;
  

  getTypeClass(pokemonType: PokemonType): string {
    return this.colorMap[pokemonType] || 'bg-gray-300 text-black'; 
  }
  

  async openModal(url: any): Promise<void>  {
    const pokemonDetails = await this.pokemonService.getPokemonDetail(url);
    this.dialog.open(CardDetailModalComponent, {
      width: '400px',
      data: pokemonDetails,
    });
  }

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {
    console.log('constructore called');
  }

  async ngOnInit() {
    console.log('PokemonListComponent: ngOnInit called');
    await this.fetchPokemon();
  }

  async fetchPokemon() {
    const rawPokemonList = await this.pokemonService.getPokemonList(150);
    this.isLoading = true; // Fetch first 150 Pokémon
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
    this.isLoading = false;
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
