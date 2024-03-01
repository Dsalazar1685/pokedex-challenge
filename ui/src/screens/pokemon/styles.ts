import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  && {
    background: rgb(173, 178, 155);
    margin: 2rem 25%;
    padding: 1rem 0;

    ::after {
      z-index: unset;
      pointer-events: none;
    }
  }
`

export const Select = styled.select`
  width: 30%
`

export const Label = styled.label``

export const List = styled.ul`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`

export const PokemonLink = styled(Link)`
  width: 100%;
  color: rgb(50, 75, 125);

  h1 {
    color: rgb(50, 75, 125);
  }

  &:hover {
    color: rgb(150, 75, 50);
    text-decoration: none;
    h1 {
      color: rgb(150, 75, 50);
      text-decoration: none;
    }
  }
`

export const ListItem = styled.li`
  width: calc(100% - 1rem);
  padding: 0 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: rgb(173, 178, 155);
  transition-property: background-color;
  transition-duration: 500ms;
  border-radius: 1rem;

  &:hover {
    background-color: rgba(150, 125, 100, 0.3);
  }

  > *:first-child {
    margin-right: 1rem;
  }
`

export const PokemonImg = styled.img`
  width: 5rem;
`

export const PokemonText = styled.span`
  flex: 1;
  display: inline-flex;
  justify-content: space-between;
`
