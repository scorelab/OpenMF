// Page to render analytics components

import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ManagementLayout from '../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import Analytics from '../../components/Management/Analytics';


const AnalyticsPage = () => {

    const auth = useSelector(state => state.auth)

    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout  sidebarBool = {false}>
                <Analytics />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={true}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default AnalyticsPage