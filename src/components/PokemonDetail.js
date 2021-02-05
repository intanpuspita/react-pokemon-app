import { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import {gql, useQuery } from '@apollo/client';
import { useAppState } from '../App';
import PokemonSpecification from './PokemonSpecification';
import {
    Grid,
    Container,
    Typography,
    Button,
    Input
} from '@material-ui/core';

const GET_POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
}`

const catchPokemon = () => {
    if(Math.floor((Math.random() * 2)) === 1) {
      return true;
    } else {
      alert('Oops.. Failed to catch pokemon!');
      return false;
    }
}

const handleAddOwnedPokemon = (currentPokemon, ownedPokemon, pokename, e) => {
    e.preventDefault();

    const nickname = e.target.elements.nickname.value.trim();
    if(!nickname) {
        alert('Please input the nickname!');
    } else {
        let concatName = nickname;
        let newTotal = 1;
        if(currentPokemon.total && currentPokemon.total > 0) {
            const names = currentPokemon.nickname.split(',');
            const duplicateVal = names.filter((name) => name === nickname);
            if(duplicateVal.length > 0) {
                alert('Nickname already used!');
                return {
                    currentPokemon,
                    ownedPokemon,
                    displayForm: true
                };
            } else {
                concatName = currentPokemon.nickname ? currentPokemon.nickname + ',' + nickname : nickname;
                newTotal = currentPokemon.total+1;
            }
        }
        
        currentPokemon = {
            name: pokename,
            total: newTotal,
            nickname: concatName
        };

        if(ownedPokemon.length > 0){
            ownedPokemon = ownedPokemon.filter((poke) => poke.name !== pokename);
            ownedPokemon.push(currentPokemon);
        }
        else {
            ownedPokemon = [currentPokemon];
        }
    }

    alert('Pokemon saved!');
    return {
        currentPokemon,
        ownedPokemon,
        displayForm: false
    };
}

const PokemonDetail = (props) => {
    const { state, dispatch } = useAppState();
    const { name, img } = props.location.state;
    const { data, loading, error } = useQuery(GET_POKEMON, {
        variables: { name }
    });

    const currentPoke = state.ownedPokemon.length > 0 ? (state.ownedPokemon.filter((poke) => poke.name === name)) : {};
    const [currentPokemon, setCurrentPokemon] = useState(currentPoke.length > 0 ? currentPoke[0] : currentPoke);
    const [displayForm, setDisplayForm] = useState(false);

    return (
        <Container>
        {(loading && <Typography variant="h6" component="p">Retrieving data...</Typography>) ||
        (error && <Typography variant="h6" component="p">Error connect to the the API.</Typography>) ||
        (data.pokemon && 
        <Container>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={2} align="center">
                      <img alt={name} src={img} width="100" height="100"/>
                  </Grid>
                  <Grid item xs={12} sm={10} css={css`@media (max-width: 420px) {
                      text-align: center;
                      }`}>
                      <Typography variant="h2" component="p">
                          {name}
                      </Typography>
                      <Typography variant="h6" component="p" css={css`color: grey;`}>
                          Owned total: {currentPokemon.total ? currentPokemon.total : 0}
                      </Typography>
                      <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={10}>
                          {!displayForm &&
                              <Button className="form-main-button" onClick={() => setDisplayForm(catchPokemon())}>Catch the pokemon!</Button>
                          }
                          {displayForm && (
                              <form css={css`display:flex; flex-direction:row;`} onSubmit={(event) => {
                                    let res = handleAddOwnedPokemon(currentPokemon, state.ownedPokemon, name, event);
                                    if(!res.displayForm) { // success to save
                                        res.currentPokemon.image = res.currentPokemon.total > 1 ? res.currentPokemon.image : img;
                                        dispatch({ type: (currentPokemon.name ? 'update' : 'add'), pokemon: res.currentPokemon});
                                        setCurrentPokemon(res.currentPokemon);
                                    }
                                    return setDisplayForm(res.displayForm);
                                  }}>
                                  <Input type="text" name="nickname" placeholder="Put the nickname" css={css`margin-top:20px`}/>
                                  <button className="form-main-button1">Submit</button>
                              </form>
                          )}
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
              <PokemonSpecification data={data}/>
          </Container>
          )}
        </Container>
    );
}

export default PokemonDetail;