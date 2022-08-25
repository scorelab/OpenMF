/*
* Dashboard Page Component
*/
// Import Dependecies
import React from 'react';
import Layout from '../../components/core/Layout';
import ManagementLayout from '../../components/Management/ManagementLayout';
import ExtractorLayout from '../../components/Extractor/ExtractorLayout';
import ProfileCard from './ProfileCard';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    Box,
    Grid
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../../components/Admin/TaskCard';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        width: '100%',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        margin: '20px'
    },
    TaskList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

const Dashboard = () => {
    // custom styles
    const classes = useStyle()

    // get tasks from admin reducer
    const auth = useSelector(state => state.auth)

    // fetch tasks
    const tasksAdmin = useSelector(state => state.admin.tasks)
    const tasksManagement = useSelector(state => state.management.todoTasks)
    const tasksExtractor = useSelector(state => state.management.todoTasks)

    // If the role is admin
    if (auth.user.role === 'admin') {
        return (
            <Layout sidebarBool={true}>
                <Container component="main" className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Dashboard
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6}>
                            <ProfileCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box>
                                {
                                    (tasksAdmin.length > 0) ?
                                        tasksAdmin.map((tasksAdmin) => {
                                            return (<TaskCard {...tasksAdmin} key={tasksAdmin.id} />)

                                        })
                                        : (
                                            <span> Not Tasks Found.</span>
                                        )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        )
    }

    // If the role is management
    else if (auth.user.role === 'management') {
        return (
            <ManagementLayout sidebarBool={true}>
                <Container component="main" className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Dashboard
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} >
                        <Grid item xs={12} sm={12} md={6}>
                            <ProfileCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box>
                                {
                                    (tasksManagement.length > 0) ?
                                        tasksManagement.map((tasksManagement) => {
                                            return (<TaskCard {...tasksManagement} key={tasksManagement.id} />)

                                        })
                                        : (
                                            <span> Not Tasks Found.</span>
                                        )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ManagementLayout>
        )
    }

    // If the role is extractor
    else if (auth.user.role === 'extractor') {
        return (
            <ExtractorLayout sidebarBool={true}>
                <Container component="main" className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Dashboard
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} >
                        <Grid item xs={12} sm={12} md={6}>
                            <ProfileCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box>
                                {
                                    (tasksExtractor.length > 0) ?
                                        tasksExtractor.map((tasksExtractor) => {
                                            return (<TaskCard {...tasksExtractor} key={tasksExtractor.id} />)

                                        })
                                        : (
                                            <span> Not Tasks Found.</span>
                                        )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ExtractorLayout>
        )
    }
}

export default Dashboard
