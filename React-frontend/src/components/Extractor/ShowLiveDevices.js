

// Importing Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider
} from '@material-ui/core';
import DeviceCard from '../Management/DeviceCard';


// custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '80vw',
        overflowX: 'auto',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
}))


// Main functional component
function ShowLiveDevices() {

    // Invoking custom classes
    const classes = useStyles()

    // Main return statement
    return (
        <Container className={classes.root}>

            <Typography variant="h6" component="h1">
                Live Connected Devices
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            <DeviceCard serialNo="" modelNo="" isLoading={true}/>
        </Container>
    )
}

export default ShowLiveDevices
