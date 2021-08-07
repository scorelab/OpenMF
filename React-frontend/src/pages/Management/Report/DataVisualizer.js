// Page for visualizing data

import React from 'react';
import HomeLogo from '../../../components/core/HomeLogo';
import ManagementLayout from '../../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import CaseVisaulizer from '../../../components/Management/CaseVisualizer';


// Main Functional Component
const DataVisualizer = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check is user authenticated
    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={false}>
                <CaseVisaulizer />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default DataVisualizer
