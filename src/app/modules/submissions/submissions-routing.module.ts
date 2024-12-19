import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionsComponent } from './submissions.component';
import { SubmissionPageComponent } from '../../components/submission-page/submission-page.component';
import { EditFormComponent } from '../../components/edit-form/edit-form.component';
import { CanComponentDeactivateGuard } from '../../guards/can-deactivate.guard';

const routes: Routes = [
  {path: '', component: SubmissionPageComponent},
  {
    path: 'edit-form-submission/:id',
    component: EditFormComponent,
    canDeactivate: [CanComponentDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionsRoutingModule { }
