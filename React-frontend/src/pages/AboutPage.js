/*
* AboutPage Component
*/

import React from 'react'
import { useSelector } from 'react-redux';
import Layout from '../components/core/Layout'
import ManagementLayout from '../components/Management/ManagementLayout';
import ExtractorLayout from '../components/Extractor/ExtractorLayout';
import AboutPageContent from './AboutPageContent';


const AboutPage = () => {
    // Invoking Auth
    const auth = useSelector(state => state.auth)

    // Check for admin User
    if (auth && auth.isAuthenticated && auth.user && auth.user.role === "admin") {
        return (
            <Layout sidebarBool={true}>
                <AboutPageContent />
            </Layout>
        )
    }
    // Check for management User
    else if (auth && auth.isAuthenticated && auth.user && auth.user.role === "management") {
        return (
            <ManagementLayout sidebarBool={true}>
                <AboutPageContent />
            </ManagementLayout>
        )
    }
    // Check for Extractor user
    else if (auth && auth.isAuthenticated && auth.user && auth.user.role === "extractor") {
        return (
            <ExtractorLayout sidebarBool={true}>
                <AboutPageContent />
            </ExtractorLayout>
        )
    }
    // If user is not authenticated
    else {
        return (
            <Layout sidebarBool={false}>
                <AboutPageContent />
            </Layout>
        )
    }
}

export default AboutPage
