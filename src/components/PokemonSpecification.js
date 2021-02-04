/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import StarIcon from '@material-ui/icons/Star';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

const getAppendedMoves = (list) => {
    let result = '';
    list.map((obj) => result += obj.move.name + ' • ');
    result = result.substr(0, result.length-3);
    return result;
}

const PokemonSpecification = (props) => {
    const data = props.data;

    return (
        <Card css={css`margin-top:50px`}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid container item spacing={3} xs={12} sm={12} md={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="body1" css={css`font-weight:bold`}>Abilities:</Typography>
                            <List>
                            { data.pokemon.abilities.map((obj) => {
                                return (
                                    // <p key={obj.ability.name}>{obj.ability.name}</p>
                                    <ListItem key={obj.ability.name}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={obj.ability.name} />
                                    </ListItem>
                                )
                            }) 
                            }
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="body1" css={css`font-weight:bold`}>Types:</Typography>
                            <List component="nav">
                            { data.pokemon.types.map((obj) => {
                                return (
                                    <ListItem key={obj.type.name}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={obj.type.name} />
                                    </ListItem>
                                )
                            }) 
                            }
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <Typography variant="body1" css={css`font-weight:bold`}>Moves:</Typography>
                        <Typography variant="body1" >{ getAppendedMoves(data.pokemon.moves) }</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PokemonSpecification;