/*
* Functional componenet to Show Details of a connected device.
*/

// Importing Dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Typography,
    Tooltip
} from '@material-ui/core';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import PhoneLinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import { defaultState } from '../../store/actions/extract';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        // width: theme.spacing(20),
        border: '1px solid rgba(0, 0, 0, 0.2)',
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 20,
        marginBottom: 20
    },
    largeIcon: {
        width: 120,
        height: 120,
        margin: theme.spacing(1)
    },
    title: {
        fontSize: ".8rem",
        fontWeight: 'bolder',
        cursor: 'pointer'
    },
    subText: {
        fontSize: '.6rem',
        fontWeight: 'bold',
        color: '#999',
        cursor: 'pointer',
    },
    button: {
        marginTop: theme.spacing(1),
        '&:focus': {
            outline: 'none'
        }
    }
}))

// Main Functional Component
function DeviceCard({ serial, model, deviceCodeName, transportID, isLoading, toggleExtractDataModel }) {

    // Invoking custom styles
    const classes = useStyles()

    // dispatcher
    const dispatch = useDispatch()

    // Function to handle click
    const handleClick = () => {
        dispatch(defaultState(model))
        toggleExtractDataModel(true)
    }


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
                    <span>loading...</span>
                ) : (
                    <>
                        <Tooltip title="Device Model">

                            <Typography className={classes.title}>
                                <svg width="16px" height="16px" style={{marginRight: '.5em'}}>
                                    <g color='green'>
                                        <circle
                                            cx="8px"
                                            cy="8px"
                                            r="5"
                                            stroke='currentcolor'
                                            fill='currentcolor'
                                        />
                                    </g>
                                </svg>

                                {model}

                            </Typography>
                        </Tooltip>

                        <Tooltip title="Device Serial Number">
                            <Typography  className={classes.subText}>
                                {serial}
                            </Typography>
                        </Tooltip>

                        <Tooltip title="Device Code Name">
                            <Typography className={classes.subText}>
                                {deviceCodeName}
                            </Typography>
                        </Tooltip>

                    </>
                )
            }
            {
                // Button
                (
                    <Button
                        className={classes.button}
                        size="small"
                        disableElevation
                        disabled={isLoading}
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleClick()}
                        >Extract Data
                    </Button>
                )
            }

        </Box>
    )

}

export default DeviceCard
