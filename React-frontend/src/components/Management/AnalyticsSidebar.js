/*
    Functional component to render
    sidebar for analytics.
*/

// Importing dependencies
import React from "react";
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
import Folder from "@material-ui/icons/Folder";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SearchIcon from "@material-ui/icons/Search";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import Poll from "@material-ui/icons/Poll";
import FilterListIcon from "@material-ui/icons/FilterList";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import BugReportIcon from "@material-ui/icons/BugReport";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RoomIcon from "@material-ui/icons/Room";
import VerifyButton from '../Utils/VerifyButton';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// custom styles
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
      content: `"Management"`,
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

function AnalyticsSidebar() {
  // invoking custom styles
  const classes = useStyles();

  // history and location
  const history = useHistory();
  const location = useLocation();

  // get auth reducer
  const auth = useSelector((state) => state.auth);

  // state for add member model

  // Management specific sidebar items
  const managementItems = [
    ["File Explorer", <Folder color="secondary" />, "/file-explorer"],
    ["case Tree", <AccountTreeIcon color="secondary" />, "/case-tree"],
    ["Analytics", <Poll color="secondary" />, "/analytics"],
    ["Back", <ArrowBackIosIcon color="secondary" />, "/"]
  ];


  // Analytics specific sidebar items
  const analyticsItems = [
    ["Common word", <BlurOnIcon color="secondary" />, "/common/Case1/Case2"],
    ["Key Word Search", <SearchIcon color="secondary" />, "/keywordsearch"],
    ["Filter", <FilterListIcon color="secondary" />, "/filter"],
    ["Location", <RoomIcon color="secondary" />, "/location"],
    ["Report", <BugReportIcon color="secondary" />, "/report"],
    ["Compare Cases", <FeaturedPlayListIcon color="secondary" />, "/compare"],
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
            {(auth.user && !auth.isLoading) ?
              (<VerifyButton />) :
              (<span>wait...</span>)
            }
          </Typography>
        </ListItem>
      </List>

      {/* Mapping analytics related items */}

      <Divider />
      <List>
        {analyticsItems.map((item, index) => (
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
          Mapping  management related items
      */}
      <Divider />
      <List>
        {managementItems.map((item, index) => (
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
      <Divider />
    </Drawer>
  );
}

export default AnalyticsSidebar;
