// page to wrap ShowFile Component.

import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ManagementLayout from '../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import ShowFile from '../../components/Management/ShowFile';

const ShowFilePage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check is user authenticated
    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <ShowFile />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default ShowFilePage
