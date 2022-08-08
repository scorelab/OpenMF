/*
    Component to render cases which contains keyword.
*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAnalyticsKeyword,
  loadCustomSearchCases,
  loadKeywordfromCase,
} from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import SelectItem from "../Utils/SelectItem";
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
  formControl: {
    marginRight: theme.spacing(1),
    justifyContent: "flex-start",
    width: "10vw",
    flexDirection: "row",
    paddingLeft: "10px",
  },
  caseText: {
    fontWeight: "bold",
  },
  copyButton: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(1.5, 0),
    width: '30%',
    "&:hover": {
    },
  }
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

  // states
  const [keyword, setKeyword] = useState("");
  const [case_name, setCase_name] = useState("");
  const [filterType, setFilterType] = useState("search");
  const [customkeyword, setCustomKeyword] = useState("");

  let case_data = managementReducer.keyword;

  let case_data_from_case = managementReducer.keywordfromcase;

  let case_from_custom_search = managementReducer.customsearch;

  // implementation of logic to get data from customsearch
  // keywordsearch and keywordfromcase api
  let data = customkeyword
    ? case_from_custom_search
    : case_name && keyword
    ? case_data_from_case
    : case_data;
  let file =
    data &&
    data.map((file, index) => {
      return file;
    });

  // options used in dropdown filter type
  const options = [
    { value: "search", name: "Search" },
    { value: "customsearch", name: "Custom Search" },
  ];

  // dispatch function
  function dispatchonClick() {
    // if filtertype is customsearch then
    // dispatch from loadcustomsearch to get cases.
    //  if case_name is given then
    //  keyword search from within the case else
    //  from the whole database
    if (filterType === "customsearch") {
      dispatch(loadCustomSearchCases(customkeyword));
    } else {
      if (case_name) {
        dispatch(loadKeywordfromCase(keyword, case_name));
      } else {
        dispatch(loadAnalyticsKeyword(keyword));
      }
    }
  }
  
  // Function to hancle copy and open file
  function callCase(id) {
    var caseLink = "file://" + id;
    var copyText = document.createElement("input");
    copyText.value = caseLink;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand("copy");
    alert("Copied the text: \n" + copyText.value + "\nto clipboard.\n\nPlease paste in new window");
    window.open("", "_blank");

  }

  // Function to return case tag
  function getCaseName(str) {
    return str.substring(str.lastIndexOf("/") + 1);
  }


  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Keyword Search
          <FormControl className={classes.formControl}>
            <SelectItem
              value={filterType}
              setValue={setFilterType}
              options={options}
              placeholder="Filter Type"
            />
          </FormControl>
        </Typography>

        <form>
          {filterType === "search" ? (
            <Container>
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
            </Container>
          ) : (
            <Container>
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                id="customkeyword"
                label="custom keyword"
                name="custom keyword"
                autoComplete="custom keyword"
                className={classes.inputs}
                type="text"
                value={customkeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
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
            </Container>
          )}
        </form>
      </Container>
      <Container>
        {/* Creating Table */}
        {managementReducer.keyword ||
        managementReducer.keywordfromcase ||
        managementReducer.customsearch ? (
          <Container>
            <TableContainer component={Paper} className={classes.paper.root}>
              <Table stickyHeader aria-label="Common words">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">Index</StyledTableCell>
                    <StyledTableCell align="left">Case Tag</StyledTableCell>
                    <StyledTableCell align="left">Copy path to Clipboard</StyledTableCell>
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
                          <StyledTableCell component="th" scope="row"
                            className={classes.caseText}
                          >
                            {getCaseName(value)}
                          </StyledTableCell>
                        }
                        {
                          <StyledTableCell component="th" scope="row" className={classes.copyButton}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              style={{ width: "10%" }}
                              onClick={() => {
                                callCase(value)}}
                            >
                              Copy
                            </Button>
                          </StyledTableCell>
                        }
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        ) : managementReducer.error ? (
          <Container>
            <Typography variant="body1" align="left" color="error">
              {managementReducer.error}
            </Typography>
          </Container>
        ) : (
          <Container>
            <div>"Please add keyword!"</div>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default Keywordsearch;
