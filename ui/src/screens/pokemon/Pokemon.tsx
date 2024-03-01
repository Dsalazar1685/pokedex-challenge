import { useState } from 'react';
import audio from './audio';
import * as S from './styles';
import Select, { MultiValue } from 'react-select';
import FILTER_OPTIONS from './const';

import { trpc } from '../../utils/trpc';

type Option = {
  label: string;
  value: string;
};

function clickLink() {
  audio.link.play()
}

export default function Pokemon() {
  const [typeFilters, setTypeFilters] = useState<MultiValue<Option>>([]);
  const [weaknessFilters, setWeaknessFilters] = useState<MultiValue<Option>>([]);

  const pokemon = trpc.pokemonList.useQuery({ types: typeFilters.map(type => type.value), weaknesses: weaknessFilters.map(weakness => weakness.value) });

  if (pokemon.isLoading) {
    return <p>Loading...</p>
  }

  if (pokemon.isError || !pokemon?.data) {
    return <p>Error!</p>
  }

  const onTypeChange = (types: MultiValue<Option>) => {
    setTypeFilters(types);
  };

  const onWeaknessChange = (weaknesses: MultiValue<Option>) => {
    setWeaknessFilters(weaknesses);
  }

  return (
    <S.Container className="nes-container is-rounded">
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div>
        <p>Select types</p>
      <Select isMulti value={typeFilters} options={FILTER_OPTIONS} onChange={onTypeChange} isOptionDisabled={() => typeFilters.length >= 2 } />
      </div>
      <div>
        <p>Select weaknesses</p>
      <Select isMulti value={weaknessFilters} options={FILTER_OPTIONS} onChange={onWeaknessChange}/>
      </div>
      </div>
      <S.List>
        {pokemon?.data?.map(pokemon => (
          <S.PokemonLink
            key={pokemon.id}
            to={pokemon.id}
            onMouseDown={clickLink}
          >
            <S.ListItem>
              <S.PokemonImg src={pokemon.img} />
              <S.PokemonText>
                <span>{pokemon.name}</span>
                <span> - {pokemon.num}</span>
              </S.PokemonText>
            </S.ListItem>
          </S.PokemonLink>
        ))}
      </S.List>
    </S.Container>
  )
}
