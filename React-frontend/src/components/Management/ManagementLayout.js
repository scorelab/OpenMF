/*
    Management layout that would be used to
    wrap all the pages related to a manage-
    ment user.
*/

import React from 'react';
import Navbar from '../core/Navbar';
import Sidebar from './Sidebar';
import AnalyticsSidebar from './AnalyticsSidebar';
import Footer from '../core/Footer';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#f4f6f8',
    height: '100vh',
    overflow: 'auto'
  },
  content: {
    display: 'flex'
  }
}))


// Display main content of layout
export default function ManagementLayout ({ children,analyticssidebarbool = false, sidebarBool=true, background=true}) {
  const classes = useStyles()
  analyticssidebarbool = !sidebarBool
  return (
    <>
      <main className={classes.root}>
        <Navbar />
        <Grid container>
       {  
          (sidebarBool) ?
          <div className={classes.content}>
              <Sidebar />
              {children}
          </div>
          : (analyticssidebarbool) ?
          (<div className={classes.content}>
              <AnalyticsSidebar />
              {children}
          </div>)
          : (
          <>
            {children}
          </>
          )
          
        }
        </Grid>
        <Footer />
      </main>
    </>
  )
}
