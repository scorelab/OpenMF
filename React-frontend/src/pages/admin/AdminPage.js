import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../../components/core/Layout';
import AddUser from './AddUser';
import UsersList from './UsersList';

const AdminPage = () => {
  return (
    <Layout sidebarBool={true} background={false}>
      <Switch>
        <Route path='/admin' exact component={UsersList} />
        <Route path='/admin/add-user' exact component={AddUser} />
      </Switch>
    </Layout>
  );
};

export default AdminPage;
