import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../store/actions/auth';
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';


// styles
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '250px',
    backgroundColor: '#f0f0f0',
    zIndex: 900,
    padding: '2vh 0'
  },
  paper: {
    width: '250px',
    padding: '2vh 0',
  },
  toolbar: theme.mixins.toolbar,
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0px',
  },
  Icon: {
    position: 'relative',
    '&::before': {
      content: `"Admin"`,
      textAlign: 'center',
      fontWeight: '600',
      fontSize: theme.spacing(1.2),
      color: '#fff',
      position: 'absolute',
      top: theme.spacing(5.2),
      left: theme.spacing(5),
      padding: '2px 10px',
      borderRadius: '10px',
      backgroundColor: theme.palette.primary.light,
      zIndex: 999
    }
  },
  profileIcon: {
    position: 'relative',
    fontSize: theme.spacing(8),
  },
  profileText: {
    color: '#404040',
    fontWeight: '600',
    fontSize: theme.spacing(1.3),
  }
}))


function Sidebar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  // User management related list items(For Admin)
  const userManagementItems = [ ['All Members', <SupervisorAccountIcon color="secondary"/>],
                                ['Add Member', <PersonAddIcon color="secondary"/>],
                                ['Search User', <SearchIcon color="secondary" />]
                              ]

  // Task Management related list items(For Admin)
  const taskManagementItems = [
                                ['Opened Tasks', <AssignmentIcon color="secondary"/>],
                                ['Closed Tasks', <DoneAllIcon color="secondary"/>],
                                ['Create Task', <AddIcon color="secondary" />]
                              ]

  // Other items
  const otherItems = [
                      ['Home', <HomeIcon color="secondary"/>],
                      ['Contact', <ContactSupportIcon color="secondary"/>],
                      ['About', <InfoIcon color="secondary"/>]
                    ]

  // Loading User
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])


  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{paper: classes.paper}}
    >
      <div className={classes.toolbar} />

      {/*
          Listing User profile related Details
      */}
      <List >
        <ListItem className={classes.profileDetails}>

          <div className={classes.Icon}>
            <AccountCircleIcon className={classes.profileIcon}/>
          </div>

          <Typography className={classes.profileText}>
            {(auth.user && !auth.isLoading) ?
              auth.user.name :
              (<span>wait...</span>)
            }
          </Typography>

          <Typography className={classes.profileText}>
            {(auth.user && !auth.isLoading) ?
              auth.user.email :
              (<span>wait...</span>)
            }
          </Typography>
        </ListItem>
      </List>

      {/*
          Mapping user management items
      */}
      <Divider />
      <List>
        {userManagementItems.map((item, index) => (
          <ListItem button key={item[0]}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]}/>
          </ListItem>
        ))}
      </List>

      {/*
          Mapping task management items
      */}
      <Divider />
      <List>
        {taskManagementItems.map((item, index) => (
          <ListItem button key={item[0]}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]}/>
          </ListItem>
        ))}
      </List>

      {/*
          Mapping other items
      */}
      <Divider />
      <List>
        {otherItems.map((item, index) => (
          <ListItem button key={item[0]}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]}/>
          </ListItem>
        ))}
      </List>


    </Drawer>
  )
}

export default Sidebar
