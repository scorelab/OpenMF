/*
* Wrapper Page to wrap TodoTask Component.
*/

import React from 'react';
import ManagementLayout from '../../components/Management/ManagementLayout';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import TodoTasks from '../../components/Management/TodoTasks';
import ExtractorLayout from '../../components/Extractor/ExtractorLayout';
const TodoTaskPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check for managemnet user
    if(auth && auth.isAuthenticated && auth.user && auth.user.role === "management"){
        return (
            <ManagementLayout sidebarBool={true}>
                <TodoTasks />
            </ManagementLayout>
        )
    }

    // Check for extractor user
    else if(auth && auth.isAuthenticated && auth.user && auth.user.role === "extractor")
    {
        return (
            <ExtractorLayout sidebarBool={true}>
                <TodoTasks />
            </ExtractorLayout>
        )
    }

    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default TodoTaskPage
