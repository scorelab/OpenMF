/*
    Functional component to render
    individual tasks inside a card.
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    // Button,
    IconButton,
    Avatar,
    ListItemText,
} from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(40),
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
    },
    icon: {
        // marginRight: theme.spacing(1),
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        // align self to the right
        alignSelf: 'flex-end',
        // width: theme.spacing(3.75),
        // height: theme.spacing(3.75),
        // fontSize: '17px'


    }
}))



function ProfileCard() {
    const classes = useStyles()
    const auth = useSelector(state => state.auth)
    // const dispatch = useDispatch()
    // const history = useHistory()
    console.log(auth.user);

    return (
        <Container component="main" className={classes.root}>
                        <Typography
                variant="body1"
                component="h4"
                // className={classes.date}
                >
                <ListItemText primary={auth && auth.user && auth.user.name.toUpperCase()} />
            </Typography>
            <IconButton className={classes.icon}>
                    <Avatar>
                        {(auth && auth.user) ? auth.user.name.charAt(0).toUpperCase() : (<span>wait...</span>)}
                    </Avatar>
            </IconButton>
            <Typography
                variant="body1"
                component="h4"
                // className={classes.bodyText}
                >
                <ListItemText primary={auth && auth.user && auth.user.role} />
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                // className={classes.bodyText}
                >
                <ListItemText primary={auth && auth.user && auth.user.email} />
            </Typography>


        </Container>
    )
}

export default ProfileCard
