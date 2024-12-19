import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pruchase-modal',
  standalone: false,
  
  templateUrl: './pruchase-modal.component.html',
  styleUrl: './pruchase-modal.component.css'
})
export class PruchaseModalComponent {

  @Output() close = new EventEmitter<void>();
  @Output() continueBrowsing = new EventEmitter<void>();
  @Output() goToSubmission = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  continue(): void {
    this.continueBrowsing.emit();
  }

  goToSubmissionPage(): void {
    this.goToSubmission.emit();
  }

}
