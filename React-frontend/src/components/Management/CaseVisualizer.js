/*
    Component to Visualize a case data.
*/

// Importing depedencies
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Divider,
  Button,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import BrowserCharts from "../Charts/BrowserCharts";
import LocationReport from "./LocationReport";
import GeneralReport from "./GeneralReport";

// custom styles
const useStyle = makeStyles((theme) => ({
  root: {
    width: "80vw",
    marginTop: "10vh",
    height: "82.5vh",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: ".9rem",
    fontWeight: "bolder",
    "&:focus": {
      outline: "none",
    },
  },
  sideBarStyles: {
    height: "70vh",
    backgroundColor: "#fff",
    borderTop: `2px solid #000`,
    borderRadius: '1em'
  },
  reportSection: {
    height: "70vh",
  },
  activeItem: {
    backgroundColor: "#f4f4f4",
    fontWeight: 'bolder',
  },
}));

// Main Functional component
function CaseVisaulizer() {
  // invoke custom styles
  const classes = useStyle();

  // Params
  const params = useParams();

  // Destructuring params
  const { caseName } = params;

  // History
  const history = useHistory();

  // Get selected_case from case reducer
  const { selected_case } = useSelector((state) => state.case);

  // state variables
  const [reportOption, setReportOption] = useState("generalInfo");

  // Main return statement
  return (
    <Container component="main" className={classes.root}>
      {/* Header */}
      <Typography component="h1" variant="h5">
        <Button className={classes.title} onClick={() => history.goBack()}>
          Case Report
        </Button>{" "}
        &gt;
        <Button className={classes.title} style={{ fontWeight: "normal" }}>
          {caseName}
        </Button>
      </Typography>

      {/* Divider */}
      <Divider style={{ width: "100%", marginTop: "1em" }} />

      <Grid container>
        {
          // Grid to show case report options
          <Grid item sm={2} className={classes.sideBarStyles}>
            <List component="nav" aria-label="report options">
              <ListItem
                button
                className={
                  reportOption === "generalInfo" ? classes.activeItem : null
                }
                onClick={() => setReportOption("generalInfo")}
              >
                General Info
              </ListItem>
              <ListItem
                button
                className={
                  reportOption === "location" ? classes.activeItem : null
                }
                onClick={() => setReportOption("location")}
              >
                Location
              </ListItem>
              <ListItem
                button
                className={
                  reportOption === "browser" ? classes.activeItem : null
                }
                onClick={() => setReportOption("browser")}
              >
                Browser
              </ListItem>
            </List>
          </Grid>
        }
        {
          // Grid to show case report/ data Visualization
          <Grid item sm={10} className={classes.reportSection}>
            {reportOption === "browser"
              ? selected_case && (
                  <BrowserCharts
                    filepath={`${selected_case.data_path}/tsv/history.tsv`}
                  />
                )
              : reportOption === "location"
              ? selected_case && (
                  <LocationReport case_name={selected_case.case_name} />
                )
              : reportOption === "generalInfo" ? selected_case && (
                    <GeneralReport case_name={selected_case.case_name} />
              ) : null}
          </Grid>
        }
      </Grid>
    </Container>
  );
}

export default CaseVisaulizer;
