//  This component is responsible for rendering general information
import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadgeneralinfo } from "../../store/actions/management";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";


// custom styles
const useStyle = makeStyles((theme) => ({
  root: {
    width: "80vw",
    overflowX: "auto",
    marginTop: "10vh",
    height: "82.5vh",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: ".9rem",
    fontWeight: "bolder",
    "&:focus": {
      outline: "none",
    },
  },
  sideBarStyles: {
    height: "70vh",
    border: "1px solid #000",
    backgroundColor: "#fff",
  },
  reportSection: {
    height: "70vh",
  },
  activeItem: {
    backgroundColor: "#f4f4f4",
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
function GeneralReport({case_name}) {
  // Dispatcher
  const dispatch = useDispatch();

  // Get management reducer
  const managementReducer = useSelector((state) => state.management);

  // invoke custom styles
  const classes = useStyle();

  // Loading general info
  useEffect(() => {
    dispatch(loadgeneralinfo(case_name));
  }, [dispatch, case_name]);
  

  return (
    <Container>
      <Container>
        <Typography component="h1" variant="h5">
          General Information
        </Typography>
      </Container>
      <Container>
        {managementReducer.generalinfo ? (
          <TableContainer component={Paper} className={classes.paper.root}>
            <Table stickyHeader aria-label="Common words">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Information</StyledTableCell>
                  <StyledTableCell align="left">Data</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {(managementReducer.generalinfo).map(
                  (value, index) => (
                    <StyledTableRow key={index}>
                      {
                        <StyledTableCell component="th" scope="row">
                          {value[0]}
                        </StyledTableCell>
                      }
                      {
                        <StyledTableCell component="th" scope="row">
                          {value[1]}
                        </StyledTableCell>
                      }
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Container>
            <Typography variant="body1" align="center" color="secondary">
              No Information Found!
            </Typography>
          </Container>
        )}
      </Container>
    </Container>
  );
}
export default GeneralReport