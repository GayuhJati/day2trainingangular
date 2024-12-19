import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.services';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-edit-form',
  standalone: false,
  
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnInit {
  submissionId: string = '';
  submissionForm: FormGroup;
  pokemonToBuy: any[] = [];
  buyOption: string = '1';
  countries = [
    { code: '+1', name: '🇺🇸' },
    { code: '+62', name: '🇮🇩' },
  ];

  constructor(
    private route: ActivatedRoute,
    private databaseService: RealtimeDatabaseService,
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.submissionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCountryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      address: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.submissionId = this.route.snapshot.paramMap.get('id') || '';
    const submission = await this.databaseService.getFormSubmission(
      this.submissionId
    );

    if (submission.buyOption) {
      this.buyOption = submission.buyOption;
    }

    if (submission.pokemonToBuy && Array.isArray(submission.pokemonToBuy)) {
      this.pokemonToBuy = await Promise.all(
        submission.pokemonToBuy.map(async (pokemonName: string) => {
          return this.pokemonService.getPokemonById(pokemonName);
        })
      );
    }

    this.submissionForm.patchValue(submission);
  }

  async saveChanges(): Promise<void> {
    if (this.submissionForm.invalid) {
      this.submissionForm.markAllAsTouched();
      return;
    }

    const updatedData = {
      ...this.submissionForm.value,
      buyOption: this.buyOption,
      pokemonToBuy: this.pokemonToBuy.map((pokemon) => pokemon.name), 
    };

    try {
      await this.databaseService.updateFormSubmission(
        this.submissionId,
        updatedData
      );
      this.router.navigate(['/submission']);
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  }

}
