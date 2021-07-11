/*
* Wrapper Page to wrap Completedtask Component.
*/

import React from 'react';
import ManagementLayout from '../../components/Management/ManagementLayout';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import Completedtasks from '../../components/Management/CompletedTasks';

const CompletedtaskPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <Completedtasks />
            </ManagementLayout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default CompletedtaskPage
