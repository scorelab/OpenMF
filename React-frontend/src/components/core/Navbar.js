import React, { useState,useEffect } from 'react'

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Link,
  Avatar,
  ListItemText,
  IconButton,
  Menu,
  Fade,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';
import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8vh',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#0f0f0f',
    color: '#fff',
    position: 'fixed',
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#000',
      TextDecoration: 'none'
    }
  },
  toolbarTitleLink: {
    '&:hover': {
      color: '#fff',
    }
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: '#fff',
    '&:hover': {
      TextDecoration: 'none',
      color: '#fff'
    }
  },
  button: {
    marginRight: theme.spacing(0.7),
    color: '#fff',
    borderRadius: theme.spacing(3.7),
    borderColor: theme.palette.primary.extraLight,
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  small: {
    position: 'relative',
    width: theme.spacing(3.7),
    height: theme.spacing(3.7),
    marginRight: theme.spacing(5),
    '&::after': {
      position: 'absolute',
      content: '" "',
      width: theme.spacing(8),
      height: theme.spacing(8),
      backgroundImage: `url(${logo})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      zIndex: 999,
    },
    '&::before': {
      position: 'absolute',
      content: '" "',
      left: theme.spacing(3),
      top: theme.spacing(2),
      width: theme.spacing(6),
      height: theme.spacing(2),
      backgroundColor: '#fff',
      zIndex: 998
    },
    '&:hover': {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    '&:onFocus': {
      border: 'none',
      outline: 'none'
    }
  },
  purple: {
    width: theme.spacing(3.75),
    height: theme.spacing(3.75),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: '17px'
  },
  headerOuter:{
    display: 'flex',
    alignItems: 'center',
    '@media(max-width:570px)':{
      display:'none'
    }
  },
  navBoxOuter:{
    width:"100%"
  },
  navBox:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    position:'absolute',
    height:"auto",
    background:"grey",
    width:"100%",
    top:"8vh",
    padding:"1rem",
    gap:"5px",
    marginRight:theme.spacing(5),
    transform:"translatex(-200vw)",
    transition:"1s ease all"
  },
  menuIcon:{
    '@media(min-width:570px)':{
      display:"none"
    }
  }
}))

// Common navbar for Dashboard, Home, Simulator, Gallery, etc.
export function Header() {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const auth = useSelector(state => state.auth)
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenLogin = () => {
    setOpenLogin(true)
  }
  const handleCloseLogin = () => {
    setOpenLogin(false)
  }
  const handleOpenSignUp = () => {
    setOpenSignUp(true)
  }
  const handleCloseSignUp = () => {
    setOpenSignUp(false)
  }
  const handleMenuIconClick=()=>{
    setOpenMenu(!openMenu)
  }
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
      width
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
     if(windowDimensions.width > 570){
   setOpenMenu(false)
 }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);
  
  return (
    <>
      {/* Display logo */}
      <IconButton edge="start" className={classes.button} color="primary">
        <Link to="/" component={RouterLink}>
          <div className={classes.small}></div>
        </Link>
      </IconButton>
      <Typography
        variant="h6"
        color="inherit"
        noWrap
        className={classes.toolbarTitle}
      >
        <Link color="inherit" to="/" component={RouterLink} className={classes.toolbarTitleLink}>
          OpenMF
        </Link>
      </Typography>

      {/* Display relative link to other pages */}
      

    <div className={classes.headerOuter}>
      <nav>
        {
          (auth.isAuthenticated
            ? (<>
              <Link
                variant="button"
                color="textPrimary"
                to="/"
                component={RouterLink}
                className={classes.link}
              >
                Home
              </Link>

              {/* <Link
                variant="button"
                color="textPrimary"
                to="/dashboard/profile"
                component={RouterLink}
                className={classes.link}
              >
                Profile
              </Link> */}

              <Link
                variant="button"
                color="textPrimary"
                to="/list-members"
                component={RouterLink}
                className={classes.link}
              >
                Members
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/contact"
                component={RouterLink}
                className={classes.link}
              >
                Contact us
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/dashboard"
                component={RouterLink}
                className={classes.link}
              >
                Dashboard
              </Link>
            </>)
            : (<>
              <Link
                variant="button"
                color="textPrimary"
                to="/"
                component={RouterLink}
                style={{ marginRight: '20px' }}
                className={classes.link}
              >
                Home
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/https://github.com/scorelab/OpenMF/"
                component={RouterLink}
                style={{ marginRight: '20px' }}
                className={classes.link}
              >
                Help
              </Link>
            </>
            )
          )
        }
      </nav>

      {/* Display login option or user menu as per authenticated status */}
      
      {
        (!auth.isAuthenticated ? (
          <>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleOpenLogin}
              disableRipple
              disableTouchRipple
            >
              Login
            </Button>
            <Dialog open={openLogin} aria-labelledby="login-form" scroll="body">
              <DialogContent >
                <LoginForm setOpenLogin={setOpenLogin} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenLogin(false)
                    setOpenSignUp(true)
                  }}
                  variant="outlined"
                  color="primary"
                  disableRipple
                  disableTouchRipple
                >
                  Register
                </Button>

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
              className={classes.button}
              disableRipple
              onClick={handleOpenSignUp}
            >
              Register
            </Button>
            <Dialog open={openSignUp} aria-labelledby="signup-form" scroll="body">
              <DialogContent >
                <RegisterForm setOpenSignUp={setOpenSignUp} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenSignUp(false)
                    setOpenLogin(true)
                  }}
                  variant="outlined"
                  color="primary"
                  disableRipple
                >
                  Login
                </Button>
                
                <Button
                  onClick={handleCloseSignUp}
                  color="primary"
                  disableRipple
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>)
          : (<>

            <IconButton
              edge="start"
              style={{ marginLeft: 'auto' }}
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar className={classes.purple}>
                {(auth && auth.user) ? auth.user.name.charAt(0).toUpperCase() : (<span>wait...</span>)}
              </Avatar>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
              style={{ marginTop: '25px' }}
            >
              <MenuItem
                component={RouterLink}
                to="/dashboard"
                onClick={handleClose}
              >
                <ListItemText primary={auth && auth.user && auth.user.email} />
              </MenuItem>
              {/* <MenuItem
                component={RouterLink}
                to="/dashboard/profile"
                onClick={handleClose}
              >
                My Profile
              </MenuItem> */}
              <MenuItem
                component={RouterLink}
                to="/dashboard"
                onClick={handleClose}
              >
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => {
                dispatch(logout(history))
              }}>
                Logout
              </MenuItem>
            </Menu>
          </>
          )
        )
      }
      
      </div>
      <IconButton
        style={{ marginLeft: 'auto' }}
        color="primary"
        className={classes.menuIcon}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenuIconClick}
      >
        <MenuIcon />
      </IconButton>
      <div className={classes.navBoxOuter}>
      <div className={classes.navBox} style={{marginRight:"1rem",transform:`${openMenu ? "translateX(0vw)" : "translateX(-200vw)"} ` }}>
      {
          (auth.isAuthenticated
            ? (<>
              <Link
                variant="button"
                color="textPrimary"
                to="/"
                component={RouterLink}
                className={classes.link}
              >
                Home
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                to="/list-members"
                component={RouterLink}
                className={classes.link}
              >
                Members
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/contact"
                component={RouterLink}
                className={classes.link}
              >
                Contact us
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/dashboard"
                component={RouterLink}
                className={classes.link}
              >
                Dashboard
              </Link>
            </>)
            : (<>
              <Link
                variant="button"
                color="textPrimary"
                to="/"
                component={RouterLink}
                style={{ marginRight: '20px' }}
                className={classes.link}
              >
                Home
              </Link>

              <Link
                variant="button"
                color="textPrimary"
                to="/https://github.com/scorelab/OpenMF/"
                component={RouterLink}
                style={{ marginRight: '20px' }}
                className={classes.link}
              >
                Help
              </Link>
            </>
            )
          )
        }
        {
        (!auth.isAuthenticated ? (
          <>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleOpenLogin}
              disableRipple
              disableTouchRipple
            >
              Login
            </Button>
            <Dialog open={openLogin} aria-labelledby="login-form" scroll="body">
              <DialogContent >
                <LoginForm setOpenLogin={setOpenLogin} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenLogin(false)
                    setOpenSignUp(true)
                  }}
                  variant="outlined"
                  color="primary"
                  disableRipple
                  disableTouchRipple
                >
                  Register
                </Button>

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
              className={classes.button}
              disableRipple
              onClick={handleOpenSignUp}
            >
              Register
            </Button>
            <Dialog open={openSignUp} aria-labelledby="signup-form" scroll="body">
              <DialogContent >
                <RegisterForm setOpenSignUp={setOpenSignUp} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenSignUp(false)
                    setOpenLogin(true)
                  }}
                  variant="outlined"
                  color="primary"
                  disableRipple
                >
                  Login
                </Button>
                
                <Button
                  onClick={handleCloseSignUp}
                  color="primary"
                  disableRipple
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>)
          : (<>

            <IconButton
              edge="start"
              style={{ marginLeft: 'auto' }}
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar className={classes.purple}>
                {(auth && auth.user) ? auth.user.name.charAt(0).toUpperCase() : (<span>wait...</span>)}
              </Avatar>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
              style={{ marginTop: '25px' }}
            >
              <MenuItem
                component={RouterLink}
                to="/dashboard"
                onClick={handleClose}
              >
                <ListItemText primary={auth && auth.user && auth.user.email} />
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/dashboard"
                onClick={handleClose}
              >
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => {
                dispatch(logout(history))
              }}>
                Logout
              </MenuItem>
            </Menu>
          </>
          )
        )
      }
      </div>
    </div>
    </>
  )
}

export default function Navbar() {
  const classes = useStyles()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar variant="dense" color="default" className={classes.toolbar}>
        <Header />
      </Toolbar>
    </AppBar>
  )
}
