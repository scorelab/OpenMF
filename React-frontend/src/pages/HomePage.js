import React , { Suspense } from 'react'
const Layout = React.lazy(() => import('../components/core/Layout'));

const HomePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Layout>
            <h1>Home Page</h1>
        </Layout>
        </Suspense>
    )
}

export default HomePage
