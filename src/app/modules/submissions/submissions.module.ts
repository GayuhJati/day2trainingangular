import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsRoutingModule } from './submissions-routing.module';
import { SubmissionPageComponent } from '../../components/submission-page/submission-page.component';
import { EditFormComponent } from '../../components/edit-form/edit-form.component';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubmissionPageComponent,
    EditFormComponent,
    DeleteModalComponent,
  ],
  imports: [
    CommonModule,
    SubmissionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SubmissionsModule { }
