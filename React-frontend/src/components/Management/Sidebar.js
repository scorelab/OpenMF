/*
    Functional component to render
    sidebar for management member.
*/


// Importing dependencies
import React from 'react';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import DoneAll from '@material-ui/icons/DoneAll';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import FolderIcon from '@material-ui/icons/Folder';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PollIcon from '@material-ui/icons/Poll';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import VerifyButton from '../Utils/VerifyButton';


// custom styles
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
      content: `"Management"`,
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
  },
  activeItem: {
    backgroundColor: '#f4f4f4'
  }
}))


function Sidebar() {

  // invoking custom styles
  const classes = useStyles()

  // history and location
  const history = useHistory()
  const location = useLocation()

  // get auth reducer
  const auth = useSelector(state => state.auth)

  // state for add member model

  // Management related items
  const managementItems = [
                            ['File Explorer', <FolderIcon color='secondary' />, '/file-explorer'],
                            ['case Tree', <AccountTreeIcon color='secondary' />, '/case-tree'],
                            ['Analytics', <PollIcon color='secondary' />, '/analytics'],
                          ]

  // Task Management related list items(For Admin)
  const taskManagementItems = [
                                ['Todo Tasks', <AssignmentIcon color="secondary"/>, "/task/todo"],
                                ['Finished Tasks', <DoneAll color="secondary" />, "/task/finished"]
                              ]

  // Other items
  const otherItems = [
                      ['Home', <HomeIcon color="secondary"/>, "/"],
                      ['Contact', <ContactSupportIcon color="secondary"/>, "/contact"],
                      ['About', <InfoIcon color="secondary"/>, "/about"]
                    ]

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

          <Typography className={classes.profileText}>
            {(auth.user && !auth.isLoading) ?
              (<VerifyButton />) :
              (<span>wait...</span>)
            }
          </Typography>
        </ListItem>
      </List>

      {/*
          Mapping  management related items
      */}
      <Divider />
      <List>
        {managementItems.map((item, index) => (
          <ListItem
            button
            key={item[0]}
            className={(location.pathname === item[2]) ? classes.activeItem : null}
            onClick={() => history.push(item[2])}
          >
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>


      {/*
          Mapping task management items
      */}
      <Divider />
      <List>
        {taskManagementItems.map((item, index) => (
          <ListItem
            button
            key={item[0]}
            className={(location.pathname === item[2]) ? classes.activeItem : null}
            onClick={() => history.push(item[2])}
          >
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>

      {/*
          Mapping other items
      */}
      <Divider />
      <List>
        {otherItems.map((item, index) => (
         <ListItem
         button key={item[0]}
         className={
           (location.pathname === item[2]) ? classes.activeItem : null}
            onClick={() => history.push(item[2])
          }
       >
         <ListItemIcon>{item[1]}</ListItemIcon>
         <ListItemText primary={item[0]} />
       </ListItem>
        ))}
      </List>


    </Drawer>
  )
}

export default Sidebar
