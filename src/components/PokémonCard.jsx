export default function PokémonCard({ pokemonData }) {
      const { name, sprites, types, stats } = pokemonData;

  return (
    <>
       <div>
      <h2 >{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src={sprites.front_default} alt={name} />
      <p><strong>Type:</strong> {types.map(t => t.type.name).join(", ")}</p>
      <div>
        <strong>Base Stats:</strong>
        <ul>
          {stats.map(stat => (
            <li key={stat.stat.name}>
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
    
  );
}


