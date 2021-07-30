/*
    Component to render common words between the cases.
*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadAnalyticsCommonWord } from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";

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

function Commonword() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  //case1 and case2 state
  const [case1, setCase1] = useState("");
  const [case2, setCase2] = useState("");

  
  // invoke custom styles
  const classes = useStyles();

  let files = managementReducer.commonwords;

  //mapping the Data
  let file = files && files.map((file, index) => {
      return file
    });

  //function for dispatching
  function dispatchonClick() {
    if (case1 && case2) {
      dispatch(loadAnalyticsCommonWord(case1, case2));
    }
  }
  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Common Words
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
            Find Common Words
          </Button>
        </form>
      </Container>

      <Container>
        {/* Creating Table */}
        {managementReducer.commonwords ? (
          <TableContainer component={Paper} className={classes.paper.root}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Index</StyledTableCell>
                  <StyledTableCell align="left">Commonword</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {file &&
                  file.map((value, index) => (
                    <StyledTableRow key={index}>
                      {
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                      }
                      {
                        <StyledTableCell component="th" scope="row">
                          {value}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : case1.length === 0 || case2.length === 0 ? (
          <div>
            Please provide Case name!
          </div>
        ) : (
          <Typography variant="body1" align="center" color="secondary">
            {managementReducer.error}
          </Typography>
        )}
      </Container>
    </Container>
  );
}

export default Commonword;
