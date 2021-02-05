/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import {gql, useQuery} from '@apollo/client';
import Pokemon from './Pokemon';
import Footer from './Footer';
import {
    Container,
    Typography
} from '@material-ui/core';

const limit = 5;
const default_offset = 0;
const GET_POKEMON_INFO = gql`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`

const PokemonList = (props) => {
    let offset = props.location.state ? (props.location.state.offset ? props.location.state.offset : undefined) : undefined;
    offset = offset ? offset : default_offset;

    const ownedPokemon = props.location.state ? (props.location.state.ownedPokemon ? props.location.state.ownedPokemon : []) : [];
    const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
        variables: { limit, offset }
    });

    return (
        <Container>
          {
              (loading && <Typography variant="h6" component="p">Retrieving data...</Typography>) ||
              (error && <Typography variant="h6" component="p">Error connect to the the API.</Typography>) ||
              (data && data.pokemons.results.length > 0 &&
                <Container>
                  <Container css={css`margin-bottom: 70px;`}>
                  {data.pokemons.results.map((poke) => <Pokemon key={poke.name} ownedPokemon={ownedPokemon} pokemon={poke}/>)}
                  </Container>
                  <Footer prev={data.pokemons.previous ? offset-limit : undefined} next={data.pokemons.next ? offset+limit : undefined}/>)
                </Container>
              )
          }
        </Container>
    );
}

export default PokemonList;