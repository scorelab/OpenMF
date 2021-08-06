// Main page for Analytics

import React from 'react';
import HomeLogo from '../../../components/core/HomeLogo';
import ManagementLayout from '../../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import Report from '../../../components/Management/Report';


// Main Functional Component
const ReportMain = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check is user authenticated
    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={false}>
                <Report />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default ReportMain
