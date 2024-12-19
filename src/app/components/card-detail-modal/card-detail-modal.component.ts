import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-card-detail-modal',
  standalone: false,
  
  templateUrl: './card-detail-modal.component.html',
  styleUrl: './card-detail-modal.component.css'
})
export class CardDetailModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDetailModalComponent>
  ) {}

  @Input() pokemon: any = null;

  close(): void {
    this.dialogRef.close();
  }

  onClick(){
    
  }
  

}
