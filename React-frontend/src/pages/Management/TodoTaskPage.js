/*
* Wrapper Page to wrap TodoTask Component.
*/

import React from 'react';
import ManagementLayout from '../../components/Management/ManagementLayout';
import Layout from '../../components/core/Layout';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import TodoTasks from '../../components/Management/TodoTasks';
const TodoTaskPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <TodoTasks />
            </ManagementLayout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default TodoTaskPage
