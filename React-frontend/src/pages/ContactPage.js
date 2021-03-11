import React , { Suspense } from 'react'
const Layout = React.lazy(() => import('../components/core/Layout'));

const AboutPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Layout sidebarBool={true}>
            <h1>Contact page</h1>
        </Layout>
        </Suspense>
    )
}

export default AboutPage
