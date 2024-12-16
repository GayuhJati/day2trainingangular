import { Injectable } from "@angular/core";
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class PokemonService{
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private apiEvolve = 'https://pokeapi.co/api/v2/evolution-chain/';
  private apiSpecies = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor() {
    console.log('PokemonService: Constructor called');
  }

  async getPokemonList(limit: number = 20) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}`);
    return response.data.results;
  }

  async getPokemonDetail(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async getPokemonById(name: string) {
    const response = await axios.get(`${this.apiUrl}/${name}`);
    return response.data;
  }

  async getPokeomenEvolve(url: string){
    const response = await axios.get(url);
    const chain = response.data.chain;
    return this.parseEvolveChain(chain);
  }

  parseEvolveChain(chain: any){
    const evolutions = [];
    let currentEvolution = chain;
    do {
      evolutions.push({
        name: currentEvolution.species.name,
        url: currentEvolution.species.url,
      });
      currentEvolution = currentEvolution.evolves_to[0];
    } while (currentEvolution);
    return evolutions;
  }

  async getPokemoneSpecies(name: string){
    const response = await axios.get(`${this.apiSpecies}/${name}`);
    return response.data;
  }
}