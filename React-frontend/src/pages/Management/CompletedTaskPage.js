/*
* Wrapper Page to wrap Completedtask Component.
*/

import React from 'react';
import ManagementLayout from '../../components/Management/ManagementLayout';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import Completedtasks from '../../components/Management/CompletedTasks';
import ExtractorLayout from '../../components/Extractor/ExtractorLayout';

const CompletedtaskPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check for management user
    if(auth && auth.isAuthenticated && auth.user && auth.user.role === "management"){
        return (
            <ManagementLayout sidebarBool={true}>
                 <Completedtasks />
            </ManagementLayout>
        )
    }

    // Check for extractor user
    else if(auth && auth.isAuthenticated && auth.user && auth.user.role === "extractor")
    {
        return (
            <ExtractorLayout sidebarBool={true}>
                 <Completedtasks />
            </ExtractorLayout>
        )
    }

    // Check for unauthenticated user
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default CompletedtaskPage
