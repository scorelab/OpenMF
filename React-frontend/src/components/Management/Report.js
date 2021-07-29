import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadAnalyticsCommonWord } from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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
    overflowX: "auto",
    minWidth: "35vw",
    maxWidth: "85vw",
  },
  table: {
    minWidth: 650,
  },
}));

function Report() {
    const classes = useStyles();
    return (
        <Container component="main" className={classes.root}>
        Report Page
        </Container>
    )
}

export default Report;