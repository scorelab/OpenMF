// component responsible for browser reports
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadBrowserReport } from "../../store/actions/management";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
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


function BrowserReport() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  // invoke custom styles
  const classes = useStyles();
  const [case_name, setCase_name] = useState("");
  let files = managementReducer.browserdata
  let data = files
  let file =
      data &&
      data.map((file, index) => {
        return file;
      });

  function dispatchonClick() {
     dispatch(loadBrowserReport(case_name));
  }
  return (
    <Container >
      <Typography component="h1" variant="h5">
        Browser frequencies
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
          Report
        </Button>
      </form>
    </Container>
  );
}
export default BrowserReport;