/*
    Component to Visualize a case data.
*/

// Importing depedencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider,
    Button
} from '@material-ui/core';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '80vw',
        overflowX: 'auto',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    },
}))

function CaseVisaulizer() {

    // invoke custom styles
    const classes = useStyle()

    // Main return statement
    return (
        <Container component="main" className={classes.root}>

            {/* Header */}
            <Typography component="h1" variant="h5">
                <Button className={classes.title}>
                    Data Visualizer
                </Button>
            </Typography>

            {/* Divider */}
            <Divider style={{width: '100%', marginTop: '1em'}} />

        </Container>
    )
}

export default CaseVisaulizer
