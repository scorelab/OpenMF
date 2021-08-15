/*
* Component to display all the members of an admin.
*/

import React, { useEffect } from 'react'
import Layout from '../../components/core/Layout'
import ShowMembers from '../../components/Admin/ShowMembers';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembers } from '../../store/actions/admin';

const MemberList = () => {
    // auth reducer
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {extractors, managements, isLoading} = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(fetchMembers())
    }, [dispatch])

    if(auth && auth.isAuthenticated){
        return (
            <Layout sidebarBool={true}>
                <ShowMembers extractors={extractors} managements={managements} isLoading={isLoading}/>
            </Layout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default MemberList
