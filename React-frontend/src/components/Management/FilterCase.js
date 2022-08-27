// component responsible for filter cases 
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import "date-fns";
import { loadFilteredCase, loadTagCases } from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import SelectItem from "../Utils/SelectItem";

import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  date: {
    color: theme.palette.text.secondary,
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

function FilterCase() {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  // invoke custom styles
  const classes = useStyles();

  // states
  const [from_date, setFromDate] = useState("");
  const [to_date, setToDate] = useState("");
  const [tags, setTags] = useState("");
  const [filterType, setFilterType] = useState("tags");

  let files = filterType === 'date'
    ? managementReducer.filtercase
    : managementReducer.casetags;

  // mapping fetched data
  let file =
    files &&
    files.map((file, index) => {
      return file;
    });
  // options used in dropdown filter type
  const options = [
    { value: "date", name: "Date" },
    { value: "tags", name: "Tags" },
  ];

  function dispatchonClick() {
    if (filterType === "date") {
      dispatch(loadFilteredCase(from_date, to_date));
    } else {
      dispatch(loadTagCases(tags));
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
          <>Filter Cases</>
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
          {/* implementing logic for filter type */}
          {filterType === "date" ? (
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              className={classes.inputs}
            >
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="From Date"
                  name="From Date"
                  format="yyyy-MM-dd"
                  variant="outlined"
                  autoOk
                  disableFuture
                  emptyLabel
                  invalidDateMessage
                  type="text"
                  className={classes.date}
                  autoFocus
                  value={from_date}
                  onChange={(e) => setFromDate(e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="To Date"
                  name="To Date"
                  format="yyyy-MM-dd"
                  variant="outlined"
                  autoOk
                  disableFuture
                  emptyLabel
                  invalidDateMessage
                  autoComplete="To Date"
                  type="text"
                  value={to_date}
                  className={classes.date}
                  onChange={(e) => setToDate(e)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  autoFocus
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => dispatchonClick()}
                >
                  Search Cases
                </Button>
              </Grid>
            </MuiPickersUtilsProvider>
          ) : (
            <Container>
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                id="tags"
                label="tags"
                name="Tags"
                autoComplete="tags"
                className={classes.inputs}
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
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
        {managementReducer.filtercase ? (
          <TableContainer component={Paper} className={classes.paper.root}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Case Files</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {file &&
                  file.map((row, index) => (
                    <StyledTableRow key={index}>
                      {
                        <StyledTableCell component="th" scope="row">
                          {row[1]}
                        </StyledTableCell>
                      }
                      {
                        <StyledTableCell component="th" scope="row">
                          {row[0]}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : managementReducer.casetags ? (
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
                    file.map((row, index) => (
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
                            {getCaseName(row)}
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
                                callCase(row)}}
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
        ) : (
          <Container>
            {filterType !== "date" ? (
              <Typography variant="body1" align="left" color="secondary">
                No Case Found
              </Typography>
            ) : (
              <Typography variant="body1" align="center" color="secondary">
                No Case Found
              </Typography>
            )}
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default FilterCase;
