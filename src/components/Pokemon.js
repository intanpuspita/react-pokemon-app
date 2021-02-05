/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useAppState } from '../App';
import { Link } from 'react-router-dom';
import {
    Grid,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent
} from '@material-ui/core';

const Pokemon = (props) => {
    const { state } = useAppState();
    const { pokemon } = props;
    let owned = 0;
    let getdata = [];
    if(state.ownedPokemon !== undefined && state.ownedPokemon.length > 0)
        getdata = state.ownedPokemon.filter((poke) => {
            return poke.name === pokemon.name
        });

    owned = getdata.length > 0 ? getdata[0].total : owned;
    return (
        <Card css={css`margin-bottom: 20px;`} key={pokemon.name}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2} align="center">
                    <img src={pokemon.image} alt={pokemon.image}/>
                    </Grid>
                    <Grid item xs={12} sm={10} css={css`@media (max-width: 420px) {
                        text-align: center;
                    }`}>
                    <Typography variant="h2" component="p">
                        {pokemon.name}
                    </Typography>
                    <Typography variant="h6" component="p" css={css`color: grey;`}>
                        Owned total: { owned }
                    </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Link to={{ pathname: '/detail', state: { name: pokemon.name, img: pokemon.image }}} css={css`width:100%; text-decoration:none;`}>
                    <Button size="large" className="main-button">More Detail</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default Pokemon;