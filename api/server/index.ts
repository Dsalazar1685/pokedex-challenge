import cors from 'cors'
import find from 'lodash/find'
import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy'
import { TRPCError } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod'

import { publicProcedure, router } from './trpc'
import pokemonObj from './pokemon.json'

interface Pokemon {
  id: string
  num: string
  name: string
  img: string
  types: string[]
  weaknesses: string[]
  height: string
  weight: string
  egg: string
  prevEvolutions?: Array<{ num: string; name: string }>
  nextEvolutions?: Array<{ num: string; name: string }>
  candy?: string
  candyCount?: number
}

const pokemon: Record<string, Pokemon> = pokemonObj

const appRouter = router({
  pokemonList: publicProcedure
    .input(z.object({ types: z.array(z.string()), weaknesses: z.array(z.string())}))
    .query((opts) => { 
      const { input: { types, weaknesses }} = opts;

      return getPokemonWithFilters(pokemon, types, weaknesses);
    }
    ),
  pokemonDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query((opts) => {
      const { input: { id } } = opts

      if (id && id !== 'undefined') {
        return {
          ...pokemon[id],
          prevEvolutions: getEvolutions(pokemon[id].prevEvolutions),
          nextEvolutions: getEvolutions(pokemon[id].nextEvolutions)
        }
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Missing Pokemon ID'
        })
      }
    })
})

function getEvolutions(evolutionObjs?: Array<{ num: string; name: string }>) {
  return (
    evolutionObjs?.map(evolution =>
      find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
    ) || []
  )
}

function getPokemonWithFilters(pokemon: Record<string, Pokemon>, types: string[], weaknesses: string[]) {
  const filteredPokemon = pickBy(pokemon, (currentPokemon => {
    const hasAllTypes = types.every(type => currentPokemon.types.includes(type));
    const hasAllWeaknesses = weaknesses.every(weakness => currentPokemon.weaknesses.includes(weakness));
    return hasAllTypes && hasAllWeaknesses;
  }))
  return sortBy(filteredPokemon, poke => parseInt(poke.id, 10))
}

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})

server.listen(3000, () => console.info('tRPC listening on port 3000'))
