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



  getTypeClass(element: string): string {
    const typeClasses: { [key: string]: string } = {
      fire: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
      water: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      grass: 'bg-gradient-to-r from-green-500 to-lime-500 text-white',
      electric: 'bg-gradient-to-r from-yellow-500 to-amber-400 text-black',
      ice: 'bg-gradient-to-r from-blue-200 to-cyan-300 text-black',
      rock: 'bg-gradient-to-r from-gray-500 to-gray-700 text-white',
      flying: 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white',
      psychic: 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white',
      dark: 'bg-gradient-to-r from-gray-800 to-black text-white',
      fairy: 'bg-gradient-to-r from-pink-300 to-rose-300 text-black',
      bug: 'bg-gradient-to-r from-green-600 to-teal-600 text-white',
      poison: 'bg-gradient-to-r from-purple-500 to-violet-700 text-white', 
    ground: 'bg-gradient-to-r from-yellow-700 to-orange-600 text-white',
    fighting: 'bg-gradient-to-r from-orange-600 to-red-700 text-white',
    ghost: 'bg-gradient-to-r from-purple-700 to-black text-white',
    };
    return typeClasses[element] || 'bg-gradient-to-r from-gray-200 to-gray-300 text-black'; // Default class
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
