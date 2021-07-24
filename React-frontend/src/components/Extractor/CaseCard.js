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
import moment from 'moment';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(20),
        maxWidth: theme.spacing(40),
        maxHeight: theme.spacing(20),
        padding: theme.spacing(2),
        border: '1px solid #aaa',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: theme.spacing(2),
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '700',
        margin: '0px'
    },
    date: {
        fontSize: '.7rem',
        margin: '0',
        fontWeight: '500',
        color: '#a0a0a0',
        marginBottom: theme.spacing(1.1),
    },
    bodyTextTitle: {
        fontSize: '.8rem',
        fontWeight: '600',
    },
    bodyText: {
        fontSize: '.8rem',
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
                className={classes.date}
                style={{marginBottom: '-2px'}}>
                    <span>{moment(extracted_on).fromNow()}</span>
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.date}>
                    {moment(extracted_on).format('DD-MM-YYYY, h:mm:ss A')}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    <span className={classes.bodyTextTitle}>Device: </span>
                    {device_id}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    <span className={classes.bodyTextTitle}>Data Path: </span>
                    {data_path}
            </Typography>
        </Container>
    )
}

export default CaseCard
