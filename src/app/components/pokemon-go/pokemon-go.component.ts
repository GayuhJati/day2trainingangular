import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.services';

@Component({
  selector: 'app-pokemon-go',
  standalone: false,
  
  templateUrl: './pokemon-go.component.html',
  styleUrl: './pokemon-go.component.css'
})
export class PokemonGoComponent implements OnInit {
  pokemon: any = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ){}

  async ngOnInit(){
    const name = this.route.snapshot.paramMap.get('name');
    if(name){
      this.pokemon = await this.pokemonService.getPokemonById(name);
    }
  }

}
