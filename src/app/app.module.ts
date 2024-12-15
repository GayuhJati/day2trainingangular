import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PokemonGoComponent } from './components/pokemon-go/pokemon-go.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardDetailModalComponent } from './components/card-detail-modal/card-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    DetailPokemonComponent,
    PokemonGoComponent,
    CardDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
