import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { IConfig, ICountry } from 'ngx-countries-dropdown';
import { PokemonService } from '../../services/pokemon.services';


@Component({
  selector: 'app-form-submission',
  standalone: false,
  
  templateUrl: './form-submission.component.html',
  styleUrl: './form-submission.component.css'
})
export class FormSubmissionComponent implements OnChanges, OnInit{
  async onSubmit(): Promise<void> {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
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

  countries = [
    { code: '+1', name: '🇺🇸' },
    { code: '+62', name: '🇮🇩' },
    { code: '+44', name: '🇬🇧' },
  { code: '+91', name: '🇮🇳' },
  { code: '+86', name: '🇨🇳' },
  { code: '+81', name: '🇯🇵' },
  { code: '+49', name: '🇩🇪' },
  { code: '+33', name: '🇫🇷' },
  { code: '+39', name: '🇮🇹' },
  { code: '+61', name: '🇦🇺' },
  { code: '+7', name: '🇷🇺' },
  { code: '+34', name: '🇪🇸' },
  ];


  onCountryChange(country: any) {
    console.log(country);
  }
  @Input() pokemon:any = null;
  @Input() evolutionChain: any[] = [];
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  selectedCountry: string | null = null;
  purchaseForm: FormGroup;
  pokemonToBuy: any[] = [];

  selectedCountryConfig: IConfig = {
    hideCode: false,
    hideName: true
  };
  countryListConfig: IConfig = {
    hideCode: false,
    
  };

  constructor(
    private fb: FormBuilder,
    private dbService: RealtimeDatabaseService,
    private pokService: PokemonService,
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
  async ngOnInit(): Promise<void> {
    const pokId = await this.pokService.getPokemonById(this.pokemon.name);
    // const submission = await this.dbService.getFormSubmission(
    //   this.submissionId
    // );
    // 
    this.purchaseForm.get('buyOption')?.valueChanges.subscribe((value) => {
      if (value === '1') {
        this.pokemonToBuy = [pokId];
      } else {
        const species = this.pokService.getPokemoneSpecies(this.pokemon.name);
        const evolutionChainUrl = species;
        const evolutionChain = this.evolutionChain;
        this.pokemonToBuy = evolutionChain.map((i: any) => i.name);
        console.log(this.pokemonToBuy)
      }
    });
      // this.pokemonToBuy = await Promise.all(
      //   this.pokemonToBuy.map(async (pokemonName: string) => {
      //     return this.pokService.getPokemonById(pokemonName);
      //   })
      // );
  
  }
  

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes['pokemon'] && changes['pokemon'].currentValue){
      console.log('updated Pokemon', this.pokemon);
      console.log(this.evolutionChain);
    }
  }
}
