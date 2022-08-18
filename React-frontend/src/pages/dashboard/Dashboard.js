/*
* Dashboard Page Component
*/
// Import Dependecies
import React from 'react';
import Layout from '../../components/core/Layout';
import ProfileCard from './ProfileCard';
import { makeStyles } from '@material-ui/core';
import {
    Container,
    Typography,
    Box
} from '@material-ui/core';

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

const Dashboard = () => {

    // auth reducer
    // const auth = useSelector(state => state.auth)
    const classes = useStyle()



    // if(auth && auth.isAuthenticated){
    //     return (
    //         <Layout sidebarBool={true}>
    //             {/* <TaskList /> */}
    //             <ProfileCard />
    //         </Layout>
    //     )
    // }
    // return (
    //     <Layout sidebarBool={false}>
    //         {/* <HomeLogo /> */}
    //     </Layout>
    // )
    return(
        <Layout sidebarBool={true}>
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                Dashboard
            </Typography>
            <Box component="div" className={classes.TaskList}>
                <ProfileCard />
            </Box>
        </Container>
        </Layout>
        
    )
}

export default Dashboard
