/*
* Wrapper page to wrap ExtractedCases component.
*/

// Importing Dependencies
import React from 'react';
import HomeLogo from '../../components/core/HomeLogo';
import ExtractorLayout from '../../components/Extractor/ExtractorLayout';
import { useSelector } from 'react-redux';
import ExtractedCases from '../../components/Extractor/ExtractedCases';

const ExtractedCasesPage = () => {

    // auth reducer
    const auth = useSelector(state => state.auth)

    // Check if user is authenticated or not
    if(auth && auth.isAuthenticated){
        return (
            <ExtractorLayout sidebarBool={true}>
                <ExtractedCases />
            </ExtractorLayout>
        )
    }

    // If user is not authenticated
    return (
        <ExtractorLayout sidebarBool={false}>
            <HomeLogo />
        </ExtractorLayout>
    )
}

export default ExtractedCasesPage
