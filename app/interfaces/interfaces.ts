//export interface IPokemonList extends IResults {
export type PokemonListType = IResults & {
  image: string;
  pokedexNumber: string;
};

export interface IResults {
  name: string;
  url: string;
}

export interface IPokemons {
  count: number; //1302
  next: string; //"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  previous?: string; //null
  results: IResults[];
}

export interface IPokemon {
  name: string;
}

export interface IPokemonByType {
  pokemon: { name: string; url: string };
}

export interface IGenerations {
  count: number; //9
  next: string | null; //"https://pokeapi.co/api/v2/generation"
  previous?: string; //null
  results: IResults[];
}

export interface IGeneration {
  abilities?: string[];
  id: number;
  main?: {};
  moves?: string[];
  name: string;
  names?: string[];
  pokemon_species: IResults[];
  types?: [];
  version_groups?: string[];
}
