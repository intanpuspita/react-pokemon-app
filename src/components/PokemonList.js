/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAppState } from '../App';
import {gql, useQuery} from '@apollo/client';
import Pokemon from './Pokemon';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import {
    Container,
    Button,
    Typography
} from '@material-ui/core';

const limit = 5;
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

const PokemonList = () => {
    const { state } = useAppState();
    const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
        variables: { limit, offset: state.offset }
    });
    
    return (
        <Container maxWidth="lg">
          <Link to="/myPokemon" css={css`text-decoration:none;`}><Button align="right" className="menu-button">My Pokemon List</Button></Link>
          <Container css={css`margin-top:30px;`}>
          {
            (loading && <Typography variant="h6" component="p">Retrieving data...</Typography>) ||
            (error && <Typography variant="h6" component="p">Error connect to the the API.</Typography>) ||
            (data && data.pokemons.results.length > 0 && 
                <Container css={css`margin-bottom: 70px;`}>
                  {data.pokemons.results.map((poke) => <Pokemon key={poke.name} pokemon={poke}/>)}
                  <Footer prev={data.pokemons.previous !== undefined && data.pokemons.previous !== null} next={data.pokemons.next !== undefined && data.pokemons.next !== null}/>
                </Container>
            )
          }
          </Container>
        </Container>
    );
}

export default PokemonList;