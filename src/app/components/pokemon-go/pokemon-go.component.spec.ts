import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGoComponent } from './pokemon-go.component';

describe('PokemonGoComponent', () => {
  let component: PokemonGoComponent;
  let fixture: ComponentFixture<PokemonGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonGoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
