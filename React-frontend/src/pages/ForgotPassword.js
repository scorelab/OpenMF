/*
* Page to render ForgotPassword and HomeLogo component.
*/


// Import Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/core/Layout';
import ForgotPasswordComponent from '../components/core/ForgotPassword';


// Main Functional Component
function ForgotPassword() {

    // Get Auth Reducer
    const { isLoading, isAuthenticated } = useSelector(state => state.auth);

    // Redirect if user is already authenticated
    if (!isLoading && isAuthenticated) {
        return <Redirect to='/' />;
    }

    // Main return statement
    return (
        <Layout sidebarBool={false} background={false}>
            <ForgotPasswordComponent />
        </Layout>
    )
}

export default ForgotPassword
