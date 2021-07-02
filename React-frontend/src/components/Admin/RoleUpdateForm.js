// Role update form
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
import { updateRole } from '../../store/actions/admin';
// import { addMember } from '../../store/actions/admin';

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


function RoleUpdateForm({toggleUpdateRoleModel}) {

    // invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // getting admin reducer
    const admin = useSelector(state => state.admin)

    // Get selected member from admin reducer
    const member= useSelector(state => state.admin.selected_user)

    // dispatcher
    const dispatch = useDispatch()

    // function to handle add member request
    function handleUpdateRole(){
        // ner role
        const new_role = (member.role === 'extractor') ? 'management': 'extractor'
        dispatch(updateRole(member.email, new_role, password, history))
        toggleUpdateRoleModel(false)
    }

    // states
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

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
                        label="Password"
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
                        disabled={ !password || admin.isLoading}
                        onClick={handleUpdateRole}
                    >
                        Update Role
                    </Button>
                </form>

            </Card>

        </Container>
    )
}

export default RoleUpdateForm
