/*
    Functional component to render
    individual tasks inside a card.
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
        maxWidth: theme.spacing(50),
        padding: theme.spacing(2),
        border: '1px solid #aaa',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: `${theme.spacing(2)}px`,
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



function TaskCard({id, title, description, due_on, is_completed}) {
    const classes = useStyles()
    return (
        <Container component="main" className={classes.root}>
            <Typography
                variant="h5"
                component="h2"
                className={classes.title}>
                    {title}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.date}>
                    {due_on}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    {description}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                    {
                        (is_completed) ? (<span>Completed</span>) : (<span>Not Completed</span>)
                    }
            </Typography>
        </Container>
    )
}

export default TaskCard
