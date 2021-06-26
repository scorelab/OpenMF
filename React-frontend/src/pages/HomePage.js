import React from 'react'
import Layout from '../components/core/Layout'
import HomeLogo from '../components/core/HomeLogo';
import { useSelector } from 'react-redux';

const HomePage = () => {
    // auth reducer
    const auth = useSelector(state => state.auth)
    if(auth && auth.isAuthenticated){
        return (
            <Layout sidebarBool={true}>
                <HomeLogo />
            </Layout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default HomePage
