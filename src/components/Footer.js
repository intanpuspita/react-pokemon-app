/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppState } from '../App';
import {
    AppBar,
    Icon,
    Toolbar
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#FFDE00',
    }
}));

const Footer = (props) => {
    const { dispatch } = useAppState();
    let { prev, next } = props;
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar css={css`margin: auto`}>
                { prev !== undefined && prev &&
                    <Icon css={css`margin-right: 200px; color: black;`} onClick={() => {
                        dispatch({ type: 'subOffset', offset: 5});
                    }}><ArrowBackIos/></Icon>
                }
                { next && 
                    <Icon css={css`color: black;`} onClick={() => {
                        dispatch({ type: 'addOffset', offset: 5});
                    }}><ArrowForwardIos/></Icon> 
                }
            </Toolbar>
        </AppBar>
    );
}

export default Footer;