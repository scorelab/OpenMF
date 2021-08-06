// component responsible for location report
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadLocationReport } from "../../store/actions/management";

import { Container, Typography } from "@material-ui/core";

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
  maps: {
    alignItems: "flex-start",
  },
}));

function LocationReport({ case_name }) {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  // invoke custom styles
  const classes = useStyles();

  // Loading coordinates
  useEffect(() => {
    dispatch(loadLocationReport(case_name));
  }, [dispatch, case_name]);

  const mapStyles = {
    height: "80vh",
    width: "100%",
  };
  // default location
  const defaultCenter = {
    lat: 22.9496165625055,
    lng: 78.61923225310515,
  };

  return (
    <Container>
      <Container>
        <Typography component="h1" variant="h5">
          Location Report
        </Typography>
      </Container>

      <Container className={classes.maps}>
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
          <Container>
            <Typography variant="body1" align="center" color="secondary">
              No Location Found!
            </Typography>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default LocationReport;
