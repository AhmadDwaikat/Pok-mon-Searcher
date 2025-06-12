import { useQuery } from "@tanstack/react-query";
import PokémonCard from "./PokémonCard";
import "./PokémonList.css";

export default function PokémonList() {
  const { data: allPokemonData } = useQuery({
    retry: false,
    queryKey: ["allPokemon"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const allPokemons = await response.json();
      const details = await Promise.all(
        allPokemons.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );

      return details;
    },
    staleTime: 0,
  });
  return (
    <>
      <ul className="pokemon-list">
        {allPokemonData?.map((pokemon) => (
          <li key={pokemon.id}>
            <PokémonCard pokemonData={pokemon} />
          </li>
        ))}
      </ul>
    </>
  );
}
