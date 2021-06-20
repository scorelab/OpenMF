import React from 'react';
import Navbar from './Navbar';
import Sidebar from '../Sidebar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#f4f6f8',
    height: '100vh',
    overflow: 'auto'
  }
}))

// Display main content of layout
export default function LayoutMain ({ children, sidebarBool=true, background=true}) {
  const classes = useStyles()

  return (
    <>
      <main className={classes.content}>
        <Navbar />
        <Grid container>
        {
          (sidebarBool) ?
          <>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              {children}
            </Grid>
          </>:
          <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {children}
            </Grid>
          </>
        }
        </Grid>
        <Footer />
      </main>
    </>
  )
}
