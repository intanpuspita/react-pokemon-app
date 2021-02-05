/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import './styles/App.css';
import AppHeader from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import MyPokemonList from './components/MyPokemonList';
import NotFoundPage from './components/NotFoundPage';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useReducer, useContext, useEffect } from 'react';

let initialState = { ownedPokemon: [], offset: 0 };
const local = localStorage.getItem('localPokemons');

if(local !== undefined && local !== null)
  initialState = JSON.parse(local);

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': return {...state, ownedPokemon: state.ownedPokemon.concat(action.pokemon)};
    case 'update': {
        const index = state.ownedPokemon.findIndex(poke => poke.name === action.pokemon.name)
        return {...state, ownedPokemon: [
           ...state.ownedPokemon.slice(0, index),
           {
              ...state.ownedPokemon[index],
              total: action.pokemon.total,
              nickname: action.pokemon.nickname
           },
           ...state.ownedPokemon.slice(index + 1),
        ]}
    };
    case 'removeNickname': {
        const index = state.ownedPokemon.findIndex(poke => poke.name === action.name);
        const pokemon = state.ownedPokemon[index];
        pokemon.total -= 1;
        pokemon.nickname = (pokemon.nickname + ",").replace(action.nickname + ",", "");
        if(pokemon.total === 0) {
            return {...state, ownedPokemon: state.ownedPokemon.filter((poke) => poke.name !== action.name)}
        } else if(pokemon.total > 0) {
            return {...state, ownedPokemon: [
                ...state.ownedPokemon.slice(0, index),
                {
                  ...state.ownedPokemon[index],
                  total: pokemon.total,
                  nickname: pokemon.nickname.substr(0, pokemon.nickname.length-2)
                },
                ...state.ownedPokemon.slice(index + 1),
            ]}
        }
        break;
    };
    case 'remove': return {...state, ownedPokemon: state.ownedPokemon.filter((poke) => poke.name !== action.pokemon.name)};
    case 'addOffset': return { ...state, offset: state.offset += action.offset};
    case 'subOffset': return { ...state, offset: state.offset -= action.offset};
    default: throw new Error('Unexpected action');
  }
};

const PokemonContext = React.createContext();

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('localPokemons', JSON.stringify(state));
  }, [state]);

  return (
    <PokemonContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

const useAppState = () => {
  const contextValue = useContext(PokemonContext);
  return contextValue;
};

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
      <AppHeader />
      <Container css={css`margin-top:100px`}>
        <Switch>
          <Route path='/' component={PokemonList} exact={true}/>
          <Route path='/detail' component={PokemonDetail}/>
          <Route path='/myPokemon' component={MyPokemonList}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Container>
      </PokemonProvider>
    </BrowserRouter>
  );
}

export { App, useAppState };