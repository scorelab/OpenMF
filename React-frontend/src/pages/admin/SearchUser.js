/*
* Component to display all the members of an admin.
*/

import React, { useEffect, useState } from 'react'
import Layout from '../../components/core/Layout'
import ShowMembers from '../../components/Admin/ShowMembers';
import HomeLogo from '../../components/core/HomeLogo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembers } from '../../store/actions/admin';
import { set } from 'date-fns';

const SearchUser = () => {
    // auth reducer
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {extractors, managements, isLoading} = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(fetchMembers())
    }, [dispatch])

    if(auth && auth.isAuthenticated){
        return (
            <div>
                <Layout sidebarBool={true}>
                    <ShowMembers extractors={extractors} managements={managements} isLoading={isLoading} isSearch={true}/>
                </Layout>
            </div>
        )
    }
    return (
        <Layout sidebarBool={false}>
            <HomeLogo />
        </Layout>
    )
}

export default SearchUser
