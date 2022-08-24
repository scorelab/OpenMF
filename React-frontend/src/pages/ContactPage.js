/*
* Contact Page Component
*/

// Import Dependecies
import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/core/Layout';
import ManagementLayout from '../components/Management/ManagementLayout';
import ExtractorLayout from '../components/Extractor/ExtractorLayout';
import ContactForm from './ContactForm';

// Main AboutPage Component
const ContactPage = () => {
    // Invoking Auth
    const auth = useSelector(state => state.auth)

    // Check for admin User
    if (auth && auth.isAuthenticated && auth.user && auth.user.role === "admin") {
        return (
            <Layout sidebarBool={true}>
                <ContactForm />
            </Layout>
        )
    }
    // Check for management User
    else if (auth && auth.isAuthenticated && auth.user && auth.user.role === "management") {
        return (
            <ManagementLayout sidebarBool={true}>
                <ContactForm />
            </ManagementLayout>
        )
    }
    // Check for Extractor user
    else if (auth && auth.isAuthenticated && auth.user && auth.user.role === "extractor") {
        return (
            <ExtractorLayout sidebarBool={true}>
                <ContactForm />
            </ExtractorLayout>
        )
    }
    // If user is not authenticated
    else {
        return (
            <Layout sidebarBool={false}>
                <ContactForm />
            </Layout>
        )
    }
}

export default ContactPage;
