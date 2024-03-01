const POKEMON_TYPES = [
    "Fire", "Water", "Grass", "Electric", "Bug", "Poison", "Flying", "Normal", "Bug", "Dragon", "Fighting", "Ghost", "Ground", "Ice", "Psychic", "Rock"
  ];
  
  const FILTER_OPTIONS = POKEMON_TYPES.map(type => ({ label: type, value: type}));

  export default FILTER_OPTIONS;