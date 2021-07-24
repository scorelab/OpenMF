/*
* This Contains ShowLiveDevices that would be wrapped inside
* LiveDevices page.
*/


// Importing Dependencies
import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider,
    Box,
    IconButton,
    Tooltip
} from '@material-ui/core';
import DeviceCard from './DeviceCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadLiveDevices } from '../../store/actions/device';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExtractDataModel from './ExtractDataModel';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    },
    devices: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },
    button: {
        marginLeft: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        '&:focus': {
            outline: 'none'
        }
    }
}))


// Main functional component
function ShowLiveDevices() {

    // Invoking custom classes
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // Get device reducer
    const device = useSelector(state => state.device)

    // Get Extract reducer
    const extract = useSelector(state => state.extract)

    // State varible to toggle ExtractDataModel
    const [ isExtractDataModelOpen, toggleExtractDataModel ] = useState(false)

    // Server call on mount
    useEffect(() => {

        // dispatch loadLiveDevices
        dispatch(loadLiveDevices())

    }, [dispatch])


    // Main return statement
    return (
        <Container className={classes.root}>


            <Box component="div" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>

                < Typography
                    variant = "h6"
                    component = "h1"
                >Live Connected Devices
                </Typography>

                <Tooltip title="Refresh">
                    <IconButton
                        onClick={() => dispatch(loadLiveDevices())}
                        aria-label='refresh-button'
                        className={classes.button}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>

            </Box>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            {
                // Showing Linear Progression
                (device.isLoading || extract.isLoading) && (
                    <LinearProgress style={{width: '100%'}} variant="query" />
                )
            }

            <Box component="div" className={classes.devices}>
                {
                    // displaying all the fetched devices
                    (device && device.isLoading) ? (
                        <DeviceCard
                                serial="Loading..."
                                model="Loading..."
                                deviceCodeName="Loading..."
                                transportID="Loading..."
                                isLoading={true}
                            />
                    ) :
                    // Render all the devices if they exists
                    (device.devices && device.devices.length > 0 ) ? (
                            device.devices.map((item, index) => {
                                return (
                                    <DeviceCard
                                    serial={item.serial}
                                    model={item.model}
                                    deviceCodeName={item.device_codename}
                                    transportID={item.transport_id}
                                    isLoading={device.isLoading}
                                    toggleExtractDataModel={toggleExtractDataModel}
                                    key={index}
                                />
                            )
                        })
                    ) :
                    // Display message if not live device connected
                    (
                        <span>No Device Connnected.</span>
                    )
                }
                {
                    // Extract Data Model
                    (<ExtractDataModel
                        isOpen={isExtractDataModelOpen}
                        toggleExtractDataModel={toggleExtractDataModel}
                    />)
                }

            </Box>
        </Container>
    )
}

export default ShowLiveDevices
