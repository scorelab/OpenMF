// page to wrap CaseFiles Component.

import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ManagementLayout from '../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import CaseFiles from '../../components/Management/CaseFiles';


const CaseFilePage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check is user authenticated
    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <CaseFiles />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default CaseFilePage
