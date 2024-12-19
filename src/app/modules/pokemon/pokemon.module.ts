import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PruchaseModalComponent } from '../../components/pruchase-modal/pruchase-modal.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { CardDetailModalComponent } from '../../components/card-detail-modal/card-detail-modal.component';
import { PokemonGoComponent } from '../../components/pokemon-go/pokemon-go.component';
import { FormSubmissionComponent } from '../../components/form-submission/form-submission.component';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PokemonComponent,
    PruchaseModalComponent,
    PokemonListComponent,
    CardDetailModalComponent,
    PokemonGoComponent,
    FormSubmissionComponent,
    DetailPokemonComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PokemonModule { }
