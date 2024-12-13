import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PokemonGoComponent } from './components/pokemon-go/pokemon-go.component';

const routes: Routes = [
  {
    path:'',
    component: PokemonListComponent
  },
  {
    path:'pokemon',
    component: DetailPokemonComponent
  },
  {
    path:'pokemon/:name',
    component: PokemonGoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
