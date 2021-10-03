/*
 * main sidebar component for admin.
 */

// Import Dependecies
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AddMemberModel from "./Admin/AddMemberModel";
import VerifyButton from "./Utils/VerifyButton";

// styles
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "250px",
    backgroundColor: "#f0f0f0",
    zIndex: 900,
    padding: "2vh 0",
  },
  paper: {
    width: "250px",
    padding: "2vh 0",
  },
  toolbar: theme.mixins.toolbar,
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px",
  },
  Icon: {
    position: "relative",
    "&::before": {
      content: `"Admin"`,
      textAlign: "center",
      fontWeight: "600",
      fontSize: theme.spacing(1.2),
      color: "#fff",
      position: "absolute",
      top: theme.spacing(5.2),
      left: theme.spacing(5),
      padding: "2px 10px",
      borderRadius: "10px",
      backgroundColor: theme.palette.primary.light,
      zIndex: 999,
    },
  },
  profileIcon: {
    position: "relative",
    fontSize: theme.spacing(8),
  },
  profileText: {
    color: "#404040",
    fontWeight: "600",
    fontSize: theme.spacing(1.3),
  },
  activeItem: {
    backgroundColor: "#f4f4f4",
  },
}));

function Sidebar() {
  // invoking custom styles
  const classes = useStyles();

  // history
  const history = useHistory();

  // location object
  const location = useLocation();

  // get auth reducer
  const auth = useSelector((state) => state.auth);

  // state for add member model
  const [isAddMemberModelOpen, setToggleAddMemberModel] = useState(false);

  // User management related list items(For Admin)
  const userManagementItems = [
    [
      "All Members",
      <SupervisorAccountIcon color="secondary" />,
      "/list-members",
    ],
    ["Add Member", <PersonAddIcon color="secondary" />, "/create-member"],
    ["Search User", <SearchIcon color="secondary" />, "/"],
  ];

  // Task Management related list items(For Admin)
  const taskManagementItems = [
    ["All Tasks", <AssignmentIcon color="secondary" />, "/task/list"],
    ["Create Task", <AddIcon color="secondary" />, "/task/create"],
  ];

  // Other items
  const otherItems = [
    ["Home", <HomeIcon color="secondary" />, "/"],
    ["Contact", <ContactSupportIcon color="secondary" />, "/contact"],
    ["About", <InfoIcon color="secondary" />, "/about"],
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.paper }}
    >
      <div className={classes.toolbar} />

      {/*
          Listing User profile related Details
      */}
      <List>
        <ListItem className={classes.profileDetails}>
          <div className={classes.Icon}>
            <AccountCircleIcon className={classes.profileIcon} />
          </div>

          <Typography className={classes.profileText}>
            {auth.user && !auth.isLoading ? (
              auth.user.name
            ) : (
              <span>wait...</span>
            )}
          </Typography>

          <Typography className={classes.profileText}>
            {auth.user && !auth.isLoading ? (
              auth.user.email
            ) : (
              <span>wait...</span>
            )}
          </Typography>

          <Typography className={classes.profileText}>
            {auth.user && !auth.isLoading ? (
              <VerifyButton />
            ) : (
              <span>wait...</span>
            )}
          </Typography>
        </ListItem>
      </List>

      {/*
          Mapping user management items
      */}
      <Divider />
      <List>
        {userManagementItems.map((item, index) => (
          <ListItem
            button
            key={item[0]}
            className={
              location.pathname === item[2] ? classes.activeItem : null
            }
            onClick={
              index === 1
                ? () => setToggleAddMemberModel(true)
                : () => history.push(item[2])
            }
          >
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>

      {/*
          Add Member Model
      */}
      <AddMemberModel
        isOpen={isAddMemberModelOpen}
        toggleAddMemberModel={setToggleAddMemberModel}
      />

      {/*
          Mapping task management items
      */}
      <Divider />
      <List>
        {taskManagementItems.map((item, index) => (
          <ListItem
            button
            key={item[0]}
            className={
              location.pathname === item[2] ? classes.activeItem : null
            }
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
          <ListItem button key={item[0]} onClick={() => history.push(item[2])}>
            <ListItemIcon>{item[1]}</ListItemIcon>
            <ListItemText primary={item[0]} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
