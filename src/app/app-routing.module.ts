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
      {
        path:'',
        component: CvPageComponent
      },
      {
        path:'pokemon',
        component: PokemonListComponent
      },
      {
        path:'pokemon/:name',
        component: PokemonGoComponent
      },
      {
        path:'submission',
        component: SubmissionPageComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
