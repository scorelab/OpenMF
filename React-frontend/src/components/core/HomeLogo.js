/*
*   HomeLogo component that would be
*   Wrapped by HomePage Component.
*/

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  Link,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import logo from '../../images/HomeLogo.png';
import { useSelector } from 'react-redux';


// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10vh',
    height: '82.5vh',
    padding: '0'
  },
  left: {
    width: '35%',
    height: '82.5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: `${theme.spacing(3)}px 0`
  },
  buttons: {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
  },
  Btn: {
    backgroundColor: theme.palette.primary.extraLight,
    color: '#fff',
    width: '100px',
    height: '40px',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    lineHeight: '40px',
    border: 'none',
    outline:'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:focus': {
      outline: 'none'
    }
  },
  knowMoreBtn: {
    width: '140px',
    height: '40px',
    fontWeight: 'bold',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    lineHeight: '30px',
  },
  right: {
    position: 'relative',
    width: '65%',
    height: '82.5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightInner: {
    width: '80%',
    height: '80%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fafafa',
    padding: theme.spacing(5),
    clipPath: 'circle(10% at 0% 0%)',
    transition: 'clip-path .4s ease-in',
    zIndex: 999,
    '&:hover': {
      clipPath: 'circle(150% at 0% 0%)'
    },
  },
  rightInner2: {
    position: 'absolute',
    width: '80%',
    minHeight: '80%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    padding: theme.spacing(5),
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  textBody: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600,
    color: '#909090'
  }
}))


// Main Component
function HomeLogo() {

  // Invoke custom classes
  const classes = useStyles()

  // Get auth Reducer
  const auth = useSelector(state => state.auth)

  // State to hold modal opening variables
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)

  // function to handle login modal open state
  const handleOpenLogin = () => {
    setOpenLogin(true)
  }

  // Function to handle login modal close state
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }

  // Function to handle Signup Modal open state
  const handleOpenSignUp = () => {
    setOpenSignUp(true)
  }

  // Function to handle Signup modal close state
  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }

  // Returning JSX
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} className={classes.left}>
          <img src={logo} alt="openMF" className={classes.logo}/>
          {(auth && !auth.isAuthenticated) && (
            <div className={classes.buttons}>
              <Button
                variant="outlined"
                className={classes.Btn}
                onClick={handleOpenLogin}
                disableRipple
                disableTouchRipple
              >
                Login
              </Button>
              <Dialog open={openLogin} aria-labelledby="login-form" scroll="body">
                <DialogContent >
                  <LoginForm />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseLogin}
                    color="primary"
                    disableRipple
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                variant="outlined"
                className={classes.Btn}
                disableRipple
                onClick={handleOpenSignUp}
              >
                Register
              </Button>
              <Dialog open={openSignUp} aria-labelledby="signup-form" scroll="body">
                <DialogContent >
                  <RegisterForm />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseSignUp}
                    color="primary"
                    disableRipple
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          <Link
            className={classes.knowMoreBtn}
            to="/about"
            component={RouterLink}
          >
            Know More
          </Link>
        </Grid>
        <Grid item xs sm md={8} className={classes.right}>
          <div className={classes.rightInner2}>
            <Typography
              component="h1"
              variant="body1"
              className={classes.title}
            >
              OpenMF
            </Typography>
            <Typography
              component="h2"
              variant="body2"
              className={classes.textBody}
            >
              OpenMF is an open source forensic tool for Android
              smartphones that helps digital forensic investigators
              throughout the life cycle of digital forensic investigation.
            </Typography>
            <br />
            <br />
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
              For e.g. let us say we have a crime scene in which we have 
              captured some suspects and we have their mobile phones.
              If we want to extract all the data from their phones
              and see which of them are actually involved in the crime
              scene then we require a software to perform this task and
              produce Meaningful evidence and Analysis report for every
              phone (Digital forensic case).
            </Typography>
          </div>
          <div className={classes.rightInner}>
            <Typography component="h1" variant="body1" className={classes.title}>
              How OpenMF Works ?
            </Typography>
            <Typography component="h6" variant="body2" className={classes.textBody}>
              Step 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Typography>
            <br />
            <br />
            <Typography component="h6" variant="body2" className={classes.textBody}>
              Step 2: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Typography>
            <br />
            <br />
            <Typography component="h6" variant="body2" className={classes.textBody}>
              Step 3: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Typography>
            <br />
            <br />
            <Typography component="h6" variant="body2" className={classes.textBody}>
              Step 4: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeLogo

