import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detail-pokemon',
  standalone: false,
  
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.css'
})
export class DetailPokemonComponent implements
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked {

  @Input() pokemon: any = null;
  @Input() theme: 'light' | 'dark' = 'light';

  ngOnChanges(changes: SimpleChanges) {
    console.log('PokemonDetailComponent: ngOnChanges called', changes);
  }

  ngDoCheck() {
    console.log('PokemonDetailComponent: ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('PokemonDetailComponent: ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('PokemonDetailComponent: ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('PokemonDetailComponent: ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('PokemonDetailComponent: ngAfterViewChecked called');
  }

}
