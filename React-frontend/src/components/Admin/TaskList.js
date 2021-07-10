/*
    Functional component that will cards
    for showing all tasks
*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/actions/admin';
import TaskCard from './TaskCard';


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
    TaskList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))



function TaskList() {

    // Invoking custorm classes
    const classes = useStyle()

    // dispatcher
    const dispatch = useDispatch()

    // get tasks from admin reducer
    const tasks = useSelector(state => state.admin.tasks)

    // fetch tasks
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                All Tasks
            </Typography>
            <Box component="div" className={classes.TaskList}>
                {
                    (tasks.length > 0) ?
                        tasks.map((task) => {
                            return (<TaskCard {...task} key={task.id} />)
                        })
                    : (
                        <span> Not Tasks Found.</span>
                    )
                }
            </Box>
        </Container>
    )
}

export default TaskList
