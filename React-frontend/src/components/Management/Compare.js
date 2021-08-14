/*
    Component to render common report between the cases.
*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCompareCalls,
  loadCompareLocations,
  loadCompareHistory,
  loadCompareSms,
 
} from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";


import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { Marker, GoogleMap, LoadScript } from "@react-google-maps/api";

// custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    overflowX: "auto",
    minWidth: "40vw",
    maxWidth: "90vw",
    marginTop: "10vh",
    height: "82.5vh",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  inputs: {
    height: theme.spacing(6),
    width: theme.spacing(80),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.extraLight,
    margin: theme.spacing(1.5, 0),
    width: theme.spacing(80),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    minWidth: "35vw",
    maxWidth: "85vw",
    position: "sticky",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.0)",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.0)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, .1)",
      outline: "1px solid slategrey",
    },
  },
  table: {
    minWidth: 650,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const mapStyles = {
  height: "80vh",
  width: "100%",
};
// default location
const defaultCenter = {
  lat: 22.9496165625055,
  lng: 78.61923225310515,
};

function Compare() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  //case1 and case2 state
  const [case1, setCase1] = useState("");
  const [case2, setCase2] = useState("");

  // invoke custom styles
  const classes = useStyles();

  //function for dispatching
  function dispatchonClick() {
    if (case1 && case2) {
      dispatch(loadCompareCalls(case1, case2));
      dispatch(loadCompareLocations(case1, case2));
      dispatch(loadCompareHistory(case1, case2));
      dispatch(loadCompareSms(case1, case2));
    }
  }

  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Data Visualization between two Cases
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="case1"
            label="case1"
            name="case1"
            autoComplete="case1"
            className={classes.inputs}
            type="text"
            value={case1}
            onChange={(e) => setCase1(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="case2"
            label="case2"
            name="case2"
            autoComplete="case2"
            className={classes.inputs}
            type="text"
            value={case2}
            onChange={(e) => setCase2(e.target.value)}
            autoFocus
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => dispatchonClick()}
          >
            Common Report
          </Button>
        </form>
      </Container>

      <Container>
        {case1 && case2 && managementReducer.comparelocations ? (
          <Typography component="h1" variant="h5">
            Common Location Spotted
          </Typography>
        ) : null}
        <br />
        {managementReducer.comparelocations ? (
          <LoadScript googleMapsApiKey="AIzaSyChFEs5XcjSCYPgcEj7r7nI4oGhJ8A5iII">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={4}
              center={defaultCenter}
            >
              {managementReducer.comparelocations.map((item, index) => {
                let data = {
                  lat: parseFloat(item[0]),
                  lng: parseFloat(item[1]),
                };

                return <Marker key={index} title={item[2]} position={data} />;
              })}
            </GoogleMap>
          </LoadScript>
        ) : null}
      </Container>
      <br />
      <Container>
        {case1 && case2 && managementReducer.comparehistory ? (
          <Typography component="h1" variant="h5">
            Common Browser History
          </Typography>
        ) : null}
        {managementReducer.comparehistory ? (
          <Bar
            data={{
              labels: managementReducer.comparehistory
                .map((value, index) => {
                  return value[0];
                })
                .filter((value, index) => {
                  return index !== 0;
                }),
              datasets: [
                {
                  label: "Title Of Common Visited URLs",
                  data: managementReducer.comparehistory
                    .map((value, index) => {
                      return value[1];
                    })
                    .filter((value, index) => {
                      return index !== 0;
                    }),
                  backgroundColor: "rgba(13, 82, 0, 1)",
                },
              ],
            }}
          />
        ) : null}
      </Container>
      <br />
      <Container>
        {case1 && case2 && managementReducer.comparecalls ? (
          <Typography component="h1" variant="h5">
            Common Call Details
          </Typography>
        ) : null}
        {managementReducer.comparecalls ? (
          <TableContainer component={Paper} className={classes.paper}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Number</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Country</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {managementReducer.comparecalls.map((value, index) => (
                  <StyledTableRow key={index}>
                    {
                      <StyledTableCell component="th" scope="row">
                        {value[0]}
                      </StyledTableCell>
                    }
                    {
                      <StyledTableCell component="th" scope="row">
                        {value[1]}
                      </StyledTableCell>
                    }
                    {
                      <StyledTableCell component="th" scope="row">
                        {value[2]}
                      </StyledTableCell>
                    }
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Container>
      <br />
      <Container>
        {case1 && case2 && managementReducer.comparesms ? (
          <Typography component="h1" variant="h5">
            Common SMS Details
          </Typography>
        ) : null}
        {managementReducer.comparesms ? (
          <TableContainer component={Paper} className={classes.paper}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Address</StyledTableCell>
                  <StyledTableCell align="left">Text</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {managementReducer.comparesms.map((value, index) => (
                  <StyledTableRow key={index}>
                    {
                      <StyledTableCell component="th" scope="row">
                        {value[0]}
                      </StyledTableCell>
                    }
                    {
                      <StyledTableCell component="th" scope="row">
                        {value[1]}
                      </StyledTableCell>
                    }
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Container>
    </Container>
  );
}
export default Compare;
