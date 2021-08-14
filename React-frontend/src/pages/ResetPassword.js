/*
* Page for Reset Password
*/


// Import Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/core/Layout';
import ResetPasswordComponent from '../components/core/ResetPassword';


// Main Functional Component
function ResetPassword() {

    // Get Auth Reducer
    const { isLoading, isAuthenticated } = useSelector(state => state.auth);

    // Redirect if user is already authenticated
    if (!isLoading && isAuthenticated) {
        return <Redirect to='/' />;
    }

    // Main return statement
    return (
        <Layout sidebarBool={false} background={false}>
            <ResetPasswordComponent />
        </Layout>
    )
}

export default ResetPassword
