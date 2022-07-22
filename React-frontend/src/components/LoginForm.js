/*
*   Function Compoennt to render Login Form.
*/

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Card,
    IconButton,
    InputAdornment,
    Avatar,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from '../images/logo.png';
import { authDefault, login } from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import SelectItem from './Utils/SelectItem';
import { authentication } from '../Firebase/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Custom styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2, 4),
        width: "350px",
        backgroundColor: '#fdfdfd'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    inputs: {
        height: theme.spacing(6),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.primary.extraLight,
        margin: theme.spacing(1.5, 0),
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))


function LoginForm({ setOpenLogin }) {

    // Invoke custorm classes
    const classes = useStyles()

    // Get auth reducer
    const auth = useSelector(state => state.auth)

    // Get dispatcher
    const dispatch = useDispatch()

    // setting up default auth state
    useEffect(() => {
        dispatch(authDefault())
    }, [dispatch])

    // option array to display inside select box
    const options = [
        { value: 'admin', name: 'Admin' },
        { value: 'extractor', name: 'Extractor' },
        { value: 'management', name: 'Management' }
    ]

    // states to hold login details
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [remember, setRemember] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    // FUnction to handle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

    // Function to handle google login
    const SignInWithFirebase = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((re) => {
                console.log(re);
                const user = re.user;
                dispatch(login(user.email, user.uid, role, remember, setOpenLogin));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Returning JSX
    return (
        <Container ccomponent="main" maxWidth="xs">
            <Card className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src={logo} alt="openMF" style={{ width: "100%" }} />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <Typography variant="body1" align="center" color="error">
                    {auth.error}
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        className={classes.inputs}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="password"
                        label="password"
                        className={classes.inputs}
                        name="password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        autoComplete="password"
                        type={!showPassword ? "password" : "text"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <SelectItem
                        value={role}
                        setValue={setRole}
                        options={options}
                        placeholder="Select Role"
                    />

                    <FormControlLabel
                        control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} color="primary" />}
                        label={<Typography variant="body2">Remember</Typography>}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={auth.isLoading || !email || !password || !role}
                        onClick={() => dispatch(login(email, password, role, remember, setOpenLogin))}
                    >
                        {(auth.isLoading) ? (<span>Logging...</span>) : (<span>Login</span>)}
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={SignInWithFirebase}
                        disabled={auth.isLoading || !role}
                    >
                        {(auth.isLoading) ? (<span>Logging...</span>) : (<span>Login with Google</span>)}
                    </Button>
                    
                </form>
            </Card>
        </Container>
    )
}

export default LoginForm
