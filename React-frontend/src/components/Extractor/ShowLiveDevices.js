

// Importing Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container
} from '@material-ui/core';


// custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '80vw',
        overflowX: 'auto',
        marginTop: '10vh',
        height: '82.5vh',
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}))


// Main functional component
function ShowLiveDevices() {

    // Invoking custom classes
    const classes = useStyles()

    // Main return statement
    return (
        <Container className={classes.root}>
            Live Devices
        </Container>
    )
}

export default ShowLiveDevices
