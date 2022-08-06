// create profile card with name, email, profile icon
import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/actions/auth';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    TaskList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

// get user
useEffect(() => {
    dispatch(fetchUser())
}
, [dispatch])


function ProfileCard(){
    // display current user name and email in box
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    console.log(user);

    return (
        <Container component="main" 
        className={classes.root}
        >
            <Typography component="h1" variant="h5">
                {user.name}
            </Typography>
            <Typography component="h1" variant="h5">
                {user.email}
            </Typography>
        </Container>
    )

}

export default ProfileCard;