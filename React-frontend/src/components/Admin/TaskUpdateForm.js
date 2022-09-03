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
import { editTask } from '../../store/actions/admin';

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


function TaskUpdateForm({ toggleUpdateRoleModel, task }) {

    // console.log("task id", task.id);
    // console.log("task title", task.title);
    // console.log("task description", task.description);
    // console.log("task due_on", task.due_on);
    // console.log("task is_completed", task.is_completed);


    // invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // getting admin reducer
    const admin = useSelector(state => state.admin)

    // Get selected member from admin reducer
    const member = useSelector(state => state.admin.selected_user)

    // dispatcher
    const dispatch = useDispatch()

    // function to handle add member request
    function handleUpdateRole() {
        // ner role
        const new_role = (member.role === 'extractor') ? 'management' : 'extractor'
        dispatch(updateRole(member.email, new_role, password, history))
        toggleUpdateRoleModel(false)
    }

    // states
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

    function handleTaskUpdate(){
        dispatch(editTask(task.id, task.title, task.description, task.due_on, history))
        // console.log("task id", task.id);
        // console.log("task title", task.title);
        // console.log("task description", task.description);
        // console.log("task due_on", task.due_on);
        // console.log("task is_completed", task.is_completed);

    }

    return (
        <Container component="main" maxWidth="xs">
            suppressContentEditableWarning={true}
            <Card className={classes.paper}>

                <Typography variant="body1" align="center" color="error">
                    {admin.error}
                </Typography>

                <form className={classes.form} noValidate>

                    {/* <TextField
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
                    </Button> */}

                    <TextField
                        disabled
                    style={{ width: "50%" }}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        label="Task ID"
                        className={classes.inputs}
                        name="task_id"
                        defaultValue={task.id}
                    />

                     <TextField
                    // set width 50% of parent
                    style={{ width: "50%" }}
                        disabled
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        label="Task Status"
                        className={classes.inputs}
                        name="task_status"
                        defaultValue={task.is_completed ? "Completed" : "Pending"}
                    />

                    <TextField
                    required
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        label="Task Title"
                        className={classes.inputs}
                        name="task_title"
                        defaultValue={task.title}
                    />

                    <TextField
                    required

                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        label="Task Description"
                        className={classes.inputs}
                        name="task_description"
                        id="description"
                        defaultValue={task.description}
                    />

                    <TextField
                    required

                    contentEditable={true}
                        name="task_dueDate"
                        label="Due Date"
                        variant="outlined"
                        id="dueDate"
                        margin="normal"
                        size="medium"
                        fullWidth
                        autoComplete="dueDate"
                        type="datetime-local"
                        // value={task.due_on}
                        defaultValue={task.due_on}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />


                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            console.log("Ye bhi chala");
                            // console.log("Task ID", document.getElementsByName("task_id")[0].value);
                            // console.log("Task Title", document.getElementsByName("task_title")[0].value);
                            // console.log("Task Description", document.getElementsByName("task_description")[0].value);
                            // console.log("Task Due Date", document.getElementsByName("task_dueDate")[0].value);
                            // console.log("Task Status", document.getElementsByName("task_status")[0].value);

                            var newTaskId = document.getElementsByName("task_id")[0].value;
                            var newTaskTitle = document.getElementsByName("task_title")[0].value;
                            var newTaskDescription = document.getElementsByName("task_description")[0].value;
                            var newTaskDueDate = document.getElementsByName("task_dueDate")[0].value;
                            var newTaskStatus = document.getElementsByName("task_status")[0].value;

                            handleTaskUpdate(newTaskId, newTaskTitle, newTaskDescription, newTaskDueDate, newTaskStatus);
                            console.log("From form: ", newTaskTitle);

                        }}


                    >
                        Update Task
                    </Button>

                </form>

            </Card>

        </Container>
    )
}

export default TaskUpdateForm
