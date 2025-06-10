import { useState } from "react";
import "./App.css";
import PokémonCard from "./components/PokémonCard";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { isPending, error, data } = useQuery({
    retry: false,
    queryKey: ["pokemon", inputValue],
    queryFn: async () =>{
   
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
      )
    
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
       },
    enabled: !!inputValue,
  });



  
  // const [pokemonData, setPokemonData] = useState(null);
  // const [pError, setPError] = useState("");
  // const [isLoading,setIsLoading] = useState(false);
  // useEffect(() => {
  //   const fetchPokemon = async () => {
  //     if (inputValue.trim() === "") {
  //       return;
  //     }
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/${inputValue}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("pokemon not Found");
  //       }
  //       const pokemon = await response.json();
  //       setPokemonData(pokemon);
  //     } catch (error) {
  //       setPError(error.message);
  //       setPokemonData(null);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchPokemon();
  // }, [inputValue]);

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
    </>
  );
}

export default App;
