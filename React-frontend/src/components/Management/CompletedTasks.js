/*
    Functional component that will cards
    for showing all completed tasks
*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    Box,
    Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../Admin/TaskCard';
import { loadCompletedTasks } from '../../store/actions/management';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '90vw',
        marginTop: '10vh',
        height: '82.5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    TaskList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
}))



function Completedtasks() {

    // Invoking custorm classes
    const classes = useStyle()

    // dispatcher
    const dispatch = useDispatch()

    // get tasks from admin reducer
    const tasks = useSelector(state => state.management.completedTasks)

    // fetch tasks
    useEffect(() => {
        dispatch(loadCompletedTasks())
    }, [dispatch])

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                All Completed Tasks
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            <Box component="div" className={classes.TaskList}>
                {
                    (tasks) && (tasks.length > 0) ?
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

export default Completedtasks
