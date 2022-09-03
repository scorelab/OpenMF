// Task update form
// It will be mounted over
// TaskUpdateModel

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    TextField,
    Card,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editTask } from '../../store/actions/admin';

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

    // invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // getting admin reducer
    const admin = useSelector(state => state.admin)

    // dispatcher
    const dispatch = useDispatch()

    // Function to handle form submit
    function handleTaskUpdate(newTaskId, newTaskTitle, newTaskDescription, newTaskDueDate) {
        dispatch(editTask(newTaskId, newTaskTitle, newTaskDescription, newTaskDueDate, history))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.paper}>

                <Typography variant="body1" align="center" color="error">
                    {admin.error}
                </Typography>

                <form className={classes.form} noValidate>
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
                            // New task details
                            var newTaskId = document.getElementsByName("task_id")[0].value;
                            var newTaskTitle = document.getElementsByName("task_title")[0].value;
                            var newTaskDescription = document.getElementsByName("task_description")[0].value;
                            var newTaskDueDate = document.getElementsByName("task_dueDate")[0].value;

                            handleTaskUpdate(newTaskId, newTaskTitle, newTaskDescription, newTaskDueDate);
                            
                            // Close modal and refresh page
                            toggleUpdateRoleModel = false
                            history.push('admin/task/list')
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
