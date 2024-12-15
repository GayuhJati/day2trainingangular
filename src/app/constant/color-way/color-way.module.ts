import { NgModule } from '@angular/core';

export type PokemonType =
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Ice'
  | 'Rock'
  | 'Flying'
  | 'Psychic'
  | 'Dark'
  | 'Fairy';

// Peta warna
export const colorMap: Record<PokemonType, string> = {
  Fire: 'bg-red-500 text-white',
  Water: 'bg-blue-500 text-white',
  Grass: 'bg-green-500 text-white',
  Electric: 'bg-yellow-500 text-black',
  Ice: 'bg-blue-200 text-black',
  Rock: 'bg-gray-500 text-white',
  Flying: 'bg-purple-400 text-white',
  Psychic: 'bg-pink-500 text-white',
  Dark: 'bg-gray-800 text-white',
  Fairy: 'bg-pink-300 text-black',
};

@NgModule({
  declarations: [],
  imports: [],
  exports: [] // Tidak ada komponen yang diekspor
})
export class ColorWayModule { }
