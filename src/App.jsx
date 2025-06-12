import { useState } from "react";
import "./App.css";
import PokémonCard from "./components/PokémonCard";
import { useQuery } from "@tanstack/react-query";
import PokémonList from "./components/PokémonList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { isPending, error, data } = useQuery({
    retry: false,
    queryKey: ["pokemon", inputValue],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    },
    staleTime: 0,
    enabled: !!inputValue,
  });

 
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmite = (event) => {
    event.preventDefault();
    setInputValue(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmite}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {!inputValue && <p>Type a Pokémon name and search!</p>}

      {inputValue && isPending && <p>Loading...</p>}
      {inputValue && error && (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      )}

      {inputValue && data && <PokémonCard pokemonData={data} />}

      <PokémonList/>
    </>
  );
}

export default App;
