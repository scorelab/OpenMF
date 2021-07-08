/*
    Function component that would be used
    to render JSON on the web.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography
} from '@material-ui/core';


// custom styles
const useStyles = makeStyles((theme) =>({
    root: {
        backgroundColor: '#1f4662',
        color: '#fff',
        fontSize: '12px',
        overflow: 'auto',
        padding: theme.spacing(4),
        height: theme.spacing(55),
    },
    headerStyle: {
        backgroundColor: '193549',
        fontFamily: 'monospace',
        color: '#ffc600',
    },
    preStyle: {
        display: 'block',
        padding: '10px 3px',
        margin: '0',
        color: '#fff'
    }
}))
function JsonPretty({data}) {

    // invoke custom styles
    const classes = useStyles()

    // default json data
    const defaultData = {
        "success": false,
        "message": "Please Provide a Case Name."
    }

    return (
        <Box component="div" className={classes.root}>
            <Typography className={classes.headerStyle}>
                Pretty Json Format
            </Typography>

            {
                (data) ? (
                    <pre className={classes.preStyle}>
                        {JSON.stringify(data, null, 4)}
                    </pre>
                ) : (
                    <pre className={classes.preStyle}>
                        {JSON.stringify(defaultData, null, 4)}
                    </pre>
                )
            }
        </Box>
    )
}

export default JsonPretty
