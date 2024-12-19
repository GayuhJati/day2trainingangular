import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonGoComponent } from '../../components/pokemon-go/pokemon-go.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-detail/:name', component: PokemonGoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
