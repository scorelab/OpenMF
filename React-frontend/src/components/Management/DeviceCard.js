/*
* Functional componenet to Show Details of a connected device.
*/


// Importing Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Button
} from '@material-ui/core';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import PhoneLinkSetupIcon from '@material-ui/icons/PhonelinkSetup';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.spacing(20),
        height: theme.spacing(25),
        border: '1px solid #000',
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    largeIcon: {
        width: 120,
        height: 120,
        marginBottom: 20
    }
}))

// Main Functional Component
function DeviceCard({ isLoading, serialNo, modelNo }) {

    // Invoking custom styles
    const classes = useStyles()

    // Main return statement
    return (
        <Box className={classes.root} component="div">

            {
                // Showing device icon according to loading state of the data.
                (isLoading) ? (
                    <DeviceUnknownIcon className={classes.largeIcon}/>
                ) : (
                    <PhoneLinkSetupIcon className={classes.largeIcon} />
                )
            }
            {
                // Showing device data according to loading state of the data.
                (isLoading) ? (
                    <span>Loading...</span>
                ) : (
                    <span>Readme Pro 3</span>
                )
            }
            {
                // Button
                (
                    <Button
                        disableElevation
                        disabled={isLoading}
                        color="secondary"
                        variant="outlined"
                        >Extract Data
                    </Button>
                )
            }

        </Box>
    )

}

export default DeviceCard
