// page to render case tree component

import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ManagementLayout from '../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import CaseTreeView from '../../components/Management/CaseTreeView';

const CaseTreePage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <CaseTreeView />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default CaseTreePage
