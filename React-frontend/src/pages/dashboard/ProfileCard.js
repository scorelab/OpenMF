/*
    Functional component to render
    profie card component
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Avatar,
    ListItemText,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import VerifyButton from '../../components/Utils/VerifyButton';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(40),
        maxWidth: theme.spacing(80),
        padding: theme.spacing(2),
        border: '1px solid #aaa',
        borderRadius: '4px',
        display: 'table',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: `${theme.spacing(2)}px`,
    },
    icon: {
        width: '90px',
        height: '90px',
        fontSize: '1.5rem',
        float: 'right',
        position: 'relative',
    },
    name: {
        alignSelf: 'flex-start',
        fontSize: '1.2rem',
        fontWeight: '500',
    }
}))



function ProfileCard() {
    // auth reducer
    const classes = useStyles()
    const auth = useSelector(state => state.auth)

    // Profile Card Component
    return (
        <Container component="main" className={classes.root}>

            <Avatar className={classes.icon}>
                {(auth && auth.user) ? auth.user.name.charAt(0).toUpperCase() : (<span>wait...</span>)}
            </Avatar>

            <Typography
                className={classes.name}
            >
                {auth && auth.user && auth.user.name.toUpperCase()}
            </Typography>

            <Typography
                variant="body1"
                component="h4"
                alignSelf={'flex-start'}
            >
                <ListItemText primary={auth && auth.user && auth.user.role} />
            </Typography>

            <Typography
                variant="body1"
                component="h4"
            >
                <ListItemText primary={auth && auth.user && auth.user.email} />
            </Typography>

            {/* Verification status button */}
            <Typography>
                {(auth.user && !auth.isLoading) ?
                    (<VerifyButton />) :
                    (<span>wait...</span>)
                }
            </Typography>

        </Container>
    )
}

export default ProfileCard
