/*
    Functional component to render
    individual tasks inside a card.
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Button
} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../store/actions/admin';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(20),
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
        marginBottom: theme.spacing(1)
    },
    icons: {
        fontSize: '2.3vh'
    },
    button: {
        marginLeft: theme.spacing(1)
    }
}))

function TaskCard({ id, title, description, due_on, is_completed }) {
    const classes = useStyles()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()

    // toggle is_completed true of false function
    function toggleComplete(id, is_completed) {
        dispatch(updateTask(id, is_completed, history))
        history.push('amdin/task/list')
    }

    return (
        <Container component="main" className={classes.root}>
            <Typography
                variant="h5"
                component="h2"
                className={classes.title}>
                {title}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.date}>
                {due_on}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                {description}
            </Typography>
            <Typography
                variant="body1"
                component="h4"
                className={classes.bodyText}>
                {
                    (is_completed) ? (<span>Completed</span>) : (<span>Not Completed</span>)
                }
            </Typography>

            {
                (auth.user.role === "admin") ?
                    (<div>
                        {/* Task Completed status Button */}
                        {
                            (is_completed) ? (
                                <Tooltip title="Mark as Not Completed" placement="bottom-start">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => toggleComplete(id, is_completed)}
                                        className={classes.button}
                                    >
                                        <CheckCircleIcon
                                            className={classes.icons}
                                        />
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Mark as Completed" placement="bottom-start">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => toggleComplete(id, is_completed)}
                                        className={classes.button}
                                    >
                                        <CheckCircleOutlineIcon
                                            className={classes.icons}
                                        />
                                    </Button>
                                </Tooltip>
                            )
                        }
                        {/* Task Edit Button */}
                        <Tooltip title="Edit" placement="bottom-end">

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                <CreateIcon className={classes.icons} />
                            </Button>
                        </Tooltip>
                    </div>
                    )
                    : null
            }

        </Container>
    )
}

export default TaskCard
