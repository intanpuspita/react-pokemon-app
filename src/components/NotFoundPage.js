import { Link } from 'react-router-dom';
import React from 'react';
import {
    Container,
    Typography
} from '@material-ui/core';

class NotFoundPage extends React.Component {
    render() {
        return (
            <Container align="center">
                <Typography variant="h1">404 - Not Found!</Typography>
                <Link to="/">
                    Go Home
                </Link>
            </Container>
        );
    }
}

export default NotFoundPage;