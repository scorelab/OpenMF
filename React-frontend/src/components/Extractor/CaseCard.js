/*
    Functional component to render the
    extracted case inside a card.
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography
} from '@material-ui/core';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(20),
        maxWidth: theme.spacing(60),
        padding: theme.spacing(2),
        border: '3px solid #e0e0e0',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: `${theme.spacing(2)}px 0px`,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: '700',
        margin: '0px'
    },
    date: {
        fontSize: theme.spacing(1.5),
        margin: '0',
        fontWeight: '500',
        color: '#a0a0a0',
        marginBottom: theme.spacing(1.1),
    },
    bodyText: {
        fontSize: theme.spacing(1.4),
        fontWeight: '400',
        marginBottom: theme.spacing(.3)
    }
}))



function CaseCard({case_name, data_path, extracted_on, device_id}) {
    const classes = useStyles()
    return (
        <Container component="main" className={classes.root}>
            <Typography
                variant="h5"
                component="h2"
                className={classes.title}>
                    {case_name}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.date}>
                    {extracted_on}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    Device: {device_id}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    Data Path: {data_path}
            </Typography>
        </Container>
    )
}

export default CaseCard
