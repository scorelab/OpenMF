// Main page for Analytics

import React from 'react';
import HomeLogo from '../../../components/core/HomeLogo';
import ManagementLayout from '../../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import Analytics from '../../../components/Management/Analytics';


// Main Functional Component
const AnalyticsMain = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check is user authenticated
    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <Analytics />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default AnalyticsMain
