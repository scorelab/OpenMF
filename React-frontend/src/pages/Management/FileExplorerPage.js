// page to wrap FileExplorer Component.

import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ManagementLayout from '../../components/Management/ManagementLayout';
import { useSelector } from 'react-redux';
import FileExplorer from '../../components/Management/FileExplorer';

const FileExplorerPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)


    if(auth && auth.isAuthenticated){
        return (
            <ManagementLayout sidebarBool={true}>
                <FileExplorer />
            </ManagementLayout>
        )
    }
    return (
        <ManagementLayout sidebarBool={false}>
            <HomeLogo />
        </ManagementLayout>
    )
}

export default FileExplorerPage
