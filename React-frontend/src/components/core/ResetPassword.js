/*
* Component for ResetPassword.
*/

// Import Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../store/actions/auth';
import { useParams } from 'react-router';
import {
    Container,
    Typography,
    Divider,
    TextField,
    InputLabel,
    Button,
    Box
} from '@material-ui/core';

// Custom Styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '92vh',
        marginTop: '8vh',
        padding: '2em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    titleText: {
        fontWeight: '600',
    },
    inputs: {
        width: '50%',
        minWidth: '255px',
        marginBottom:'2em'
    },
    inputLabel: {
        fontSize: '.8rem',
        marginBottom: '.2em'
    },
    buttonStyle: {
        '&:focus': {
            outline: 'none'
        }
    }
}))

// Main Functional Component
function ForgotPassword() {

    // Invoking custom styles
    const classes  = useStyles()

    // params
    const { token } = useParams()

    // history
    const history = useHistory()

    // State to hold emali input
    const [ password, setPassword ] = useState('')

    // Get Auth reducer's loading state
    const { isResettingPassword } = useSelector(state => state.auth)

    // Dipatcher
    const dispatch = useDispatch()

    // Handler for sending reset link
    const handleResetPassword= (token, password, history) => {

        // Dipatch sendResetLink
        dispatch(resetPassword(token, password, history, setPassword))

    }

    return (
        <Container className={classes.root}>

            <Typography
                component="h1"
                variant="h5"
                className={classes.titleText}
            > Reset Password</Typography >

            <Divider style={{ width: '100%', margin: '2em 0'}}/>

            <Typography
                component="h4"
                variant="body2"
                style={{marginBottom: '2em'}}
            >
                Please enter the new password that you want to use for further login.
            </Typography>

            <InputLabel
                className={classes.inputLabel}
            >
                Enter New Password
            </InputLabel>

            <TextField
                variant='outlined'
                name='email'
                id='email'
                margin='normal'
                size='small'
                type='email'
                className={classes.inputs}
                autoFocus={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Box >

                {/* Send Link Button */}
                <Button
                    variant='contained'
                    size='small'
                    disableRipple
                    disableElevation
                    color='secondary'
                    disabled={!password || isResettingPassword}
                    style={{ marginRight: '1em'}}
                    onClick={() => handleResetPassword(token, password, history)}
                >
                    {
                        (isResettingPassword) ? (<span>Resetting...</span>) : (<span>Reset Password</span>)
                    }
                </Button>

                {/* Back to Home Page button */}
                <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                    className={classes.buttonStyle}
                    disableRipple
                    disableElevation
                >
                    <Link
                        to="/"
                        style={{color: '#000'}}
                        >Home
                    </Link>
                </Button>

            </Box>
        </Container>
    )
}

export default ForgotPassword

