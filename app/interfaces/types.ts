export type PokemonType = {
  name: PokeTypes | "All";
  url?: string;
};

type PokeTypes =
  | "normal"
  | "poison"
  | "rock"
  | "bug"
  | "fire"
  | "ghost"
  | "dark"
  | "grass";

export type IPokeGeneration = {
  name?: string;
  url?: string;
};
