/*
* Page to create tasks.
*/

import React from 'react';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import CreateTaskForm from '../../components/Admin/CreateTaskForm';

const CreateTask = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <Layout sidebarBool={true}>
                <CreateTaskForm />
            </Layout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default CreateTask
