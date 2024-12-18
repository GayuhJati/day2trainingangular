import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PokemonGoComponent } from './components/pokemon-go/pokemon-go.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardDetailModalComponent } from './components/card-detail-modal/card-detail-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormSubmissionComponent } from './components/form-submission/form-submission.component';
import {MatButtonModule} from '@angular/material/button';
import { SubmissionPageComponent } from './components/submission-page/submission-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    DetailPokemonComponent,
    PokemonGoComponent,
    CardDetailModalComponent,
    NavbarComponent,
    FormSubmissionComponent,
    SubmissionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCountriesDropdownModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
