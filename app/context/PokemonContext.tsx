import { createContext, useState } from "react";
import { PokemonType } from "../interfaces/types";

interface ContextProps {
  types: PokemonType[];
  //filterSelected: PokemonType;
  //pokemonsFiltered: string[] | null;
  //changeTypeSelected: (type: PokemonType) => void;
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

const PokemonProvider = ({ children }: any) => {
  const [types, setTypes] = useState([]);

  return (
    <PokemonContext.Provider value={{ types }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
