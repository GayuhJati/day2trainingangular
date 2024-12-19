import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PokemonGoComponent } from './components/pokemon-go/pokemon-go.component';
import { SubmissionPageComponent } from './components/submission-page/submission-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { CvPageComponent } from './components/cv-page/cv-page.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { CanComponentDeactivateGuard } from './guards/can-deactivate.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path:'auth',
    component: AuthFormComponent
  },
  {
    path:'',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children:[
      { path: '', component: CvPageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent},
      {
        path: 'pokemon',
        loadChildren: () =>
          import('./modules/pokemon/pokemon.module').then(
            (m) => m.PokemonModule
          ),
      },
      {
        path: 'submission',
        loadChildren: () =>
          import('./modules/submissions/submissions.module').then(
            (m) => m.SubmissionsModule
          ),
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
