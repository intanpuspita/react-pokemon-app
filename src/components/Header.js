/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container
} from '@material-ui/core';
  
class AppHeader extends React.Component {
    render() {
        return (
            <Container>
              <AppBar name="myHeader" css={css`
                background-color: #FFDE00 !important;
              `}>
                <Toolbar>
                  <Typography align="center" variant="h6" noWrap
                    css={css`width:100%; color: #CC0000;`}>
                        Pokemon Application
                  </Typography>
                </Toolbar>
              </AppBar>
            </Container>
        );
    }
}

export default AppHeader;