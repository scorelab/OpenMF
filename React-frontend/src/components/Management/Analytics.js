import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../images/HomeLogo.png";
import { Container, Typography, Grid } from "@material-ui/core";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
    height: "82.5vh",
    padding: "0",
  },
  left: {
    width: "35%",
    height: "82.5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: `${theme.spacing(3)}px 0`,
  },
  buttons: {
    width: "40%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
  },
  Btn: {
    backgroundColor: theme.palette.primary.extraLight,
    color: "#fff",
    width: "100px",
    height: "40px",
    borderRadius: theme.spacing(2),
    textAlign: "center",
    lineHeight: "40px",
    border: "none",
    outline: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:focus": {
      outline: "none",
    },
  },
  knowMoreBtn: {
    width: "140px",
    height: "40px",
    fontWeight: "bold",
    borderRadius: theme.spacing(2),
    textAlign: "center",
    lineHeight: "30px",
  },
  right: {
    position: "relative",
    width: "65%",
    height: "82.5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightInner: {
    width: "80%",
    height: "80%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#fafafa",
    padding: theme.spacing(5),
    clipPath: "circle(10% at 0% 0%)",
    transition: "clip-path .4s ease-in",
    zIndex: 999,
    "&:hover": {
      clipPath: "circle(150% at 0% 0%)",
    },
  },
  rightInner2: {
    position: "absolute",
    width: "80%",
    minHeight: "80%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#fff",
    padding: theme.spacing(5),
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  textBody: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600,
    color: "#909090",
  },
}));

function Analytics() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} className={classes.left}>
          <img src={logo} alt="openMF" className={classes.logo} />
        </Grid>
        <Grid item xs sm md={8} className={classes.right}>
          <div className={classes.rightInner2}>
            <Typography
              component="h1"
              variant="body1"
              className={classes.title}
            >
              OpenMF Analytics
            </Typography>
            <Typography
              component="h2"
              variant="body2"
              className={classes.textBody}
            >
              OpenMF analytics is a mobile forensic analytics service offered by
              SCoRe Lab (Sustainable Computing Research Lab) that helps to
              analyse data extracted from Android Devices.
            </Typography>
            <br />
            <br />
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
              <li>Common Words : Search common between the data.</li>
              <li>Keyword Search : Search keyword to relate the cases.</li>
              <li>Filter : Filter cases date wise.</li>
              <li>Location : Find the searched location from case.</li>
              <li>
                General Info : Get the general informations of the device.
              </li>
              <li>Tag Association : Give tags to cases.</li>
              <li>
                Data Visualization : Visualize data using maps,graphs and
                tables.
              </li>
            </Typography>
          </div>
          <div className={classes.rightInner}>
            <Typography
              component="h1"
              variant="body1"
              className={classes.title}
            >
              How OpenMF Works ?
            </Typography>
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
              Login as either Admin, Management or Extractor based on your puspose.
            </Typography>
            <br />
            <br />
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
             As admin, then you can add new users, manage users and their roles. Declare and Manage tasks.
              <br/>
              As Management, You can access, analyse, and report on the data collected from the users.
              <br/>
              As Extractor, you have the ability and permissions to perform extractions on the connected devices.

            </Typography>
            <br />
            <br />
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
              OpenMF allows you to study data in various formats and perform various operations on it. With easy 
            to use interface, you can perform various operations on the data.
            </Typography>
            <br />
            <br />
            <Typography
              component="h6"
              variant="body2"
              className={classes.textBody}
            >
            All the data is classified and seperated using tags and stored in a database, to allow easy access and analysis.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Analytics;
