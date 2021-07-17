/*
    Component to render cases which contains keyword.
*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAnalyticsKeyword,
  loadKeywordfromCase,
} from "../../store/actions/management";
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

function Keywordsearch() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);
  
  // invoke custom styles
  const classes = useStyles();

  //keyword and case state
  const [keyword, setKeyword] = useState("");
  const [case_name, setCase_name] = useState("");

  let case_data = managementReducer.keyword;

  let case_data_from_case = managementReducer.keywordfromcase;

  // implementation of logic to get data from both api
  let data = case_name && keyword ? case_data_from_case : case_data;
  let file =
    data &&
    data.map((file, index) => {
      return file;
    });
  
  // dispatch function
  function dispatchonClick() {

    //  if case_name is given then 
    //  keyword search from within the case else
    //  from the whole database
    if (case_name) {
      dispatch(loadKeywordfromCase(keyword, case_name));
    } else {
      dispatch(loadAnalyticsKeyword(keyword));
    }
  }

  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Keyword Search
        </Typography>
        <Typography variant="body1" align="center" color="error">
          {managementReducer.error}
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth={true}
            id="keyword"
            label="keyword"
            name="keyword"
            autoComplete="keyword"
            className={classes.inputs}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
          />
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
            Find Cases
          </Button>
        </form>
      </Container>
      <Container>
        {/* Creating Table */}
        {managementReducer.keyword || managementReducer.keywordfromcase ? (
          <TableContainer component={Paper} className={classes.paper.root}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Index</StyledTableCell>
                  <StyledTableCell align="left">Case Files</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {file &&
                  file.map((value, index) => (
                    <StyledTableRow key={index}>
                      {
                        <StyledTableCell component="th" scope="row" key={index}>
                          {index + 1}
                        </StyledTableCell>
                      }
                      {
                        <StyledTableCell component="th" scope="row" key={index}>
                          {value}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>"Please add keyword!"</div>
        )}
      </Container>
    </Container>
  );
}

export default Keywordsearch;
