import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import axios from 'axios';
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PokemonService{
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private apiEvolve = 'https://pokeapi.co/api/v2/evolution-chain/';
  private apiSpecies = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {
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

  async getPokemonByName(name: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/${name}`));
  }

  async getPokeomenEvolve(url: string): Promise<any[]> {
    const response = await firstValueFrom(this.http.get<any>(url));
    const chain = response.chain;

    const evolutions = this.parseEvolutionChain(chain);
    const detailedEvolutions = await Promise.all(
      evolutions.map(async (evo) => {
        const details = await this.getPokemonByName(evo.name);
        return {
          ...evo,
          sprites: details.sprites,
          selected: true,
        };
      })
    );

    return detailedEvolutions;
  }

  private parseEvolutionChain(chain: any): any[] {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url,
      });
      current = current.evolves_to[0];
    }

    return evolutions;
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
