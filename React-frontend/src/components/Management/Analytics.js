import React from "react";
import { makeStyles } from "@material-ui/core/styles";


import {
  Container,
  Grid,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "75vw",
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
  cardcontent: {
    display: "flex",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

function Analytics() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className={classes.cardcontent}
      >
        Analytics Page
      </Grid>
    </Container>
  );
}

export default Analytics;
