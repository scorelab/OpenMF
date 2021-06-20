import React from 'react'
import Layout from '../components/core/Layout'
import HomeLogo from '../components/core/HomeLogo';

const HomePage = () => {
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default HomePage
