/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import {
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@material-ui/core';
import { useAppState } from '../App';

const MyPokemonList = () => {
    const { state, dispatch } = useAppState();
    return(
        <Container>
            <Typography variant="h2" component="p">My Pokemon</Typography>
            <Container css={css`margin-top: 30px`}>
            {(state.ownedPokemon === undefined || state.ownedPokemon.length === 0) && <Typography variant="h5" component="p">Your don't have any pokemon.</Typography> }
            {state.ownedPokemon.map((poke) => 
                <Card css={css`margin-bottom: 20px;`} key={poke.name}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4} align="center">
                                <img alt={poke.name} src={poke.image} css={css`width:100px`} />
                                <Typography variant="h2" component="p">{poke.name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <Typography variant="h5" component="p">Names</Typography>
                                <TableContainer component={Paper} css={css`margin-top:20px;`}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {
                                                poke.nickname.split(',').map((nickname) => {
                                                return(
                                                    <TableRow key="name">
                                                        <TableCell>{nickname}</TableCell>
                                                        <TableCell><Button className="remove-button" onClick={() => { 
                                                            dispatch({ type: 'removeNickname', name: poke.name, nickname })
                                                        }}>Remove</Button></TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
            </Container>
        </Container>
    );
}

export default MyPokemonList;