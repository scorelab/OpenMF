// Add User Form
// It will be mounted over
// AddUserModel

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    TextField,
    Card,
    IconButton,
    InputAdornment,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMember } from '../../store/actions/admin';
import SelectItem from '../Utils/SelectItem';
import { authentication } from '../../Firebase/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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


function AddMemberForm({toggleAddMemberModel}) {

    // invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // getting admin reducer
    const admin = useSelector(state => state.admin)

    // dispatcher
    const dispatch = useDispatch()

    // function to handle add member request
    function handleAddMember(){
        dispatch(addMember(username, email, role, password, history))
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('')
        toggleAddMemberModel(false)
    }

    // option array to display inside select box
    const options = [
        { value: 'extractor', name: 'Extractor' },
        { value: 'management', name: 'Management' }
    ]

    // states
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

    // function to handle google signup
    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((re) => {
                console.log(re);
                const user = re.user;
                dispatch(addMember(user.displayName, user.email, role, user.uid, history))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.paper}>

                <Typography variant="body1" align="center" color="error">
                    {admin.error}
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="username"
                        label="username"
                        name="username"
                        autoFocus
                        className={classes.inputs}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

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
                    />

                    <SelectItem
                        value={role}
                        setValue={setRole}
                        options={options}
                        placeholder="Select Role"
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
                                        {showPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        autoComplete="password"
                        type={!showPassword ? "password": "text"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={ !username || !email || !password || !role ||admin.isLoading}
                        onClick={handleAddMember}
                    >
                        Add Member
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={admin.isLoading || !role}
                        onClick={handleGoogleSignup}
                    >
                        Add Member with Google
                    </Button>

                    {!role &&
                        <Typography variant="body2" align="center" color="error">
                            <span>Please select a Role</span>
                        </Typography>
                    }
                </form>

            </Card>

        </Container>
    )
}

export default AddMemberForm
