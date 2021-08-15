// component responsible for pointing locations from case

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadLocationReport } from "../../store/actions/management";

import { Container, Typography, TextField, Button } from "@material-ui/core";

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

  maps: {
    alignItems: "flex-start",
  },
}));

function Location() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  const [case_name, setCase_name] = useState("");

  // invoke custom styles
  const classes = useStyles();

  const mapStyles = {
    height: "80vh",
    width: "100%",
  };
  // default location
  const defaultCenter = {
    lat: 22.9496165625055,
    lng: 78.61923225310515,
  };

  //function for dispatching
  function dispatchonClick() {
    if (case_name) {
      dispatch(loadLocationReport(case_name));
    }
  }
  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Locations
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="case_name"
            label="case"
            name="case_name"
            autoComplete="case_name"
            className={classes.inputs}
            type="text"
            value={case_name}
            onChange={(e) => setCase_name(e.target.value)}
            autoFocus
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => dispatchonClick()}
          >
            Find Locations
          </Button>
        </form>
      </Container>
      <Container className={classes.root.maps}>
        {managementReducer.coordinates ? (
          <LoadScript googleMapsApiKey="AIzaSyChFEs5XcjSCYPgcEj7r7nI4oGhJ8A5iII">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={4}
              center={defaultCenter}
            >
              {managementReducer.coordinates.map((item, index) => {
                let data = {
                  lat: parseFloat(item[0]),
                  lng: parseFloat(item[1]),
                };

                return <Marker key={index} title={item[2]} position={data} />;
              })}
            </GoogleMap>
          </LoadScript>
        ) : (
          <Typography variant="body1" align="left" color="secondary">
            No Location Found!
          </Typography>
        )}
      </Container>
    </Container>
  );
}
export default Location;
