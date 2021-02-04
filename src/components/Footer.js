/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
    let { prev, next } = props;

    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar css={css`margin: auto`}>
                
                { prev !== undefined &&
                    <Link to={{ pathname: '/', state: { offset: (prev ? prev : 0) }}}>
                        <Icon css={css`margin-right: 200px`}><ArrowBackIos/></Icon>
                    </Link>
                }
                { next && 
                    <Link to={{ pathname: '/', state: { offset: (next ? next : 0) }}}>
                        <Icon><ArrowForwardIos/></Icon> 
                    </Link>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Footer;