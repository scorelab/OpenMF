import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "date-fns";
import {
  loadFilteredCase,
} from "../../store/actions/management";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
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
  Grid,
  Divider,
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

function FilterCase () {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);
  // history
  const history = useHistory();
  // invoke custom styles
  const classes = useStyles();

  const [from_date, setFromDate] = useState("")
  const [to_date, setToDate] = useState("");

  let files = managementReducer.filtercase


  let file = files && files.map((file, index) => {
      return file
   })


  function dispatchonClick() {
    dispatch(loadFilteredCase(from_date, to_date))
  }
  return (
    <Container component="main" className={classes.root}>
      <Container>
        <Typography component="h1" variant="h5">
          Filter Cases
        </Typography>
        <form>
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
                        <StyledTableCell component="th" scope="row" key={index}>
                          {row[1]}
                        </StyledTableCell>
                      }
                      {
                        <StyledTableCell component="th" scope="row" key={index}>
                          {row[0]}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" align="center" color="secondary">
            No Case Found
          </Typography>
        )}
      </Container>
    </Container>
  );
}

export default FilterCase