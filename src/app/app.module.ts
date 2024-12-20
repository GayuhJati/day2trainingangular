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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormSubmissionComponent } from './components/form-submission/form-submission.component';
import {MatButtonModule} from '@angular/material/button';
import { SubmissionPageComponent } from './components/submission-page/submission-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { environment } from './environtments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { CvPageComponent } from './components/cv-page/cv-page.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PruchaseModalComponent } from './components/pruchase-modal/pruchase-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/cart/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthFormComponent,
    LayoutComponent,
    CartComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCountriesDropdownModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { cart: cartReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
