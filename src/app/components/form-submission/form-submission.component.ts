import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { IConfig, ICountry } from 'ngx-countries-dropdown';


@Component({
  selector: 'app-form-submission',
  standalone: false,
  
  templateUrl: './form-submission.component.html',
  styleUrl: './form-submission.component.css'
})
export class FormSubmissionComponent implements OnChanges{
  async onSubmit(): Promise<void> {
    try{
      this.dbService.saveFormSubmission(this.purchaseForm.value);
    }catch(err){
      console.error('Error saving form submission:', err);
    }
    const formData = {
      ...this.purchaseForm.value,
      pokemonToBuy:
        this.purchaseForm.value.buyOption === '1'
          ? [this.pokemon.name]
          : this.evolutionChain.map((i: any) => i.name),
    };
    try {
      await this.dbService.saveFormSubmission(formData);
      this.closeDrawer.emit();
      this.formSubmitted.emit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  onCountryChange(country: any) {
    console.log(country);
  }
  @Input() pokemon:any = null;
  @Input() evolutionChain: any[] = [];
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  selectedCountry: string | null = null;
  purchaseForm: FormGroup;

  selectedCountryConfig: IConfig = {
    hideCode: false,
    hideName: true
  };
  countryListConfig: IConfig = {
    hideCode: false,
    
  };

  constructor(
    private fb: FormBuilder,
    private dbService: RealtimeDatabaseService
  ){
    this.purchaseForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCountryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      address:['',Validators.required],
      buyOption: ['1', Validators.required],
  });
  }  
  

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemon'] && changes['pokemon'].currentValue){
      console.log('updated Pokemon', this.pokemon);
      console.log(this.evolutionChain);
    }
  }
}
