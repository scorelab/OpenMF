/*
* Dashboard Page Component
*/

// Import Dependecies
import React from 'react';
import Layout from '../../components/core/Layout';
import MemberList from '../admin/MemberList';
import { useSelector, useDispatch } from 'react-redux';
import ShowMembers from '../../components/Admin/ShowMembers';
import { fetchMembers } from '../../store/actions/admin';
import UsersList from '../admin/UsersList';


// Main Profile Component
const Dashboard = () => {
// get user details

     // auth reducer
     const auth = useSelector(state => state.auth)
     const dispatch = useDispatch()
     const {extractors, managements, isLoading} = useSelector(state => state.admin)
 
    return (
        <Layout sidebarBool={true}>
                <ShowMembers extractors={extractors} managements={managements} isLoading={isLoading}/>
                <br></br>
                <UsersList />
        </Layout>
    )
}

export default Dashboard
