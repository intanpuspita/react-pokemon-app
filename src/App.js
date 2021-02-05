/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import './styles/App.css';
import AppHeader from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import NotFoundPage from './components/NotFoundPage';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Container css={css`margin-top:100px`}>
        <Switch>
          <Route path='/' component={PokemonList} exact={true}/>
          <Route path='/detail' component={PokemonDetail}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;