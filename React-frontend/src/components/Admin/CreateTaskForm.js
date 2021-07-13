/*
    Functional component that will contain
    Form for creating/assining new task
*/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    TextField,
    Box,
    FormControl,
    FormControlLabel,
    RadioGroup,
    FormLabel,
    Radio,
    Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../store/actions/admin';


// custom styles
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
    form: {
        display: 'flex',
        width: '60vw',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'flex-start',
        padding: theme.spacing(2),
        // border: '1px solid #000'
    },
    btn: {
        marginTop: theme.spacing(2)
    }
}))



function CreateTaskForm() {

    // Invoking custorm classes
    const classes = useStyle()

    // dispatcher
    const dispatch = useDispatch()

    // history
    const history = useHistory()

    // usestate varibles
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [role, setRole] = useState("extractor")
    const [memberEmail, setMemberEmail] = useState("")
    const [dueDate, setDueDate] = useState("")

    // get admin state
    const admin = useSelector(state => state.admin)

    // submit form handler
    function handleSubmitForm(){
        dispatch(createTask(title, description, role, memberEmail, history))
    }

    return (
        <Container component="main" className={classes.root}>
            <Typography variant="h5" component="h1">
                Create Task
            </Typography>
            <Box component="form" className={classes.form}>

                <TextField
                    name="title"
                    label="Title"
                    id="title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    size="medium"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="title"
                    required
                />

                <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    id="description"
                    margin="normal"
                    size="medium"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="Description"
                    required
                    rows={4}
                    multiline
                />

                <TextField
                    name="dueDate"
                    label="Due Date"
                    variant="outlined"
                    id="dueDate"
                    margin="normal"
                    size="medium"
                    fullWidth
                    onChange={(e) => setDueDate(e.target.value)}
                    autoComplete="dueDate"
                    type="datetime-local"
                    value={dueDate}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Member Role</FormLabel>
                    <RadioGroup
                        row
                        aria-label="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <FormControlLabel value="extractor" control={<Radio />} label="Extractor" />
                        <FormControlLabel value="management" control={<Radio />} label="Management" />
                    </RadioGroup>
                </FormControl>

                <TextField
                    name="memberEmail"
                    label="Member Email"
                    variant="outlined"
                    id="memberEmail"
                    margin="normal"
                    size="medium"
                    fullWidth
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    autoComplete="memberEmail"
                    type="email"
                    required
                />

                <Button
                    disabled={!title || !memberEmail || admin.isLoading}
                    variant="contained"
                    color="secondary"
                    className={classes.btn}
                    onClick={handleSubmitForm}>
                    Create
                </Button>
            </Box>


        </Container>
    )
}

export default CreateTaskForm
