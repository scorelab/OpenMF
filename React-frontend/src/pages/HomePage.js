import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeLogo from '../images/HomeLogo.png';
import Layout from '../components/core/Layout';
import StatsCard from '../components/StatsCard';
import { fetchStats } from '../store/actions/stats';
import CaseFiles from '../images/Dashboard/case_files.png';
import UserManagement from '../images/Dashboard/user_management.png';

const HomePage = () => {
  const dispatch = useDispatch();
  const { usersCount, casesCount, isLoading } = useSelector(
    state => state.stats
  );

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <Layout>
      <div className='p-4 row'>
        <div className='col-6' align='center'>
          <img src={HomeLogo} alt='Home Logo' height='300px' width='330px' />
          <p className='mt-2 lead text-center'>
            Open source forensic tool for <br /> Android Smartphones
          </p>
        </div>
        <div className='col-4'>
          {!isLoading ? (
            <StatsCard
              image={UserManagement}
              upperText='No. of Users'
              lowerText={usersCount}
            />
          ) : null}
          {!isLoading ? (
            <StatsCard
              image={CaseFiles}
              upperText='No. of Cases'
              lowerText={casesCount}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
