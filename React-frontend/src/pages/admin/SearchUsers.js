/*
 * Component to search from the members to an admin.
 */

import React, { useEffect } from 'react'
import Layout from '../../components/core/Layout'
import SearchUserModel from '../../components/Admin/SearchUserModel';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembers } from '../../store/actions/admin';

const SearchUser = () => {
    // auth reducer
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {extractors, managements} = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(fetchMembers())
    }, [dispatch])

    if(auth && auth.isAuthenticated){
        return (
            <Layout sidebarBool={true}>
                <SearchUserModel extractors={extractors} managements={managements}/>
            </Layout>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default SearchUser