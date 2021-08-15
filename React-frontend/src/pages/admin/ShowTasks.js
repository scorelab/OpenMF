/*
* ShowTask Component to display all the tasks.
*/

import React from 'react';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import TaskList from '../../components/Admin/TaskList';

const ShowTasks = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <Layout sidebarBool={true}>
                <TaskList />
            </Layout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default ShowTasks
