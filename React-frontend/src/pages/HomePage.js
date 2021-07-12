/*
*  Wrapper for homepage including
*  Layout, Sidebar and HomeLogo components.
*/

import React from 'react'
import Layout from '../components/core/Layout'
import HomeLogo from '../components/core/HomeLogo';
import { useSelector } from 'react-redux';
import ManagementLayout from '../components/Management/ManagementLayout';

const HomePage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check for admin User
    if(auth && auth.isAuthenticated && auth.user && auth.user.role === "admin"){
        return (
            <Layout sidebarBool={true}>
                <HomeLogo />
            </Layout>
        )
    }

    // Check for management User
    else if(auth && auth.isAuthenticated && auth.user && auth.user.role === "management"){
        return (
            <ManagementLayout sidebarBool={true}>
                <HomeLogo />
            </ManagementLayout>
        )
    }

    // If user is not authenticated
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )

}

export default HomePage
