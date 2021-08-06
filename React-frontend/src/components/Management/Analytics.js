import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../images/HomeLogo.png";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "40vw",
    maxWidth: "100vw",
    marginTop: "8vh",
    height: "75vh",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },

  logo: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    margin: `${theme.spacing(3)}px 0`,
  },
  right: {
    width: "80%",
    minHeight: "80%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#fff",
    padding: theme.spacing(5),
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
  },
  textBody: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600,
    color: "#909090",
    backgroundColor: "#fff",
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

function Analytics() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Table stickyHeader aria-label="Common words">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              <Container>
                <img src={logo} alt="openMF" className={classes.logo} />
              </Container>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              <Container className={classes.right}>
                <div>
                  <Typography
                    component="h1"
                    variant="body1"
                    className={classes.title}
                  >
                    OpenMF Analytics
                  </Typography>
                  <Typography
                    component="h2"
                    variant="body2"
                    className={classes.textBody}
                  >
                    OpenMF analytics is a mobile forensic analytics service
                    offered by SCoRe Lab (Sustainable Computing Research Lab)
                    that helps to analyse data extracted from Android Devices.
                  </Typography>
                  <br />
                  <br />
                  <Typography
                    component="h6"
                    variant="body2"
                    className={classes.textBody}
                  >
                    <li>Common Words : Search common between the data.</li>
                    <li>
                      Keyword Search : Search keyword to relate the cases.
                    </li>
                    <li>Filter : Filter cases date wise.</li>
                    <li>Location : Find the searched location from case.</li>
                    <li>
                      General Info : Get the general informations of the device.
                    </li>
                    <li>Tag Association : Give tags to cases.</li>
                    <li>
                      Data Visualization : Visualize data using maps,graphs and
                      tables.
                    </li>
                  </Typography>
                </div>
              </Container>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </Container>
  );
}

export default Analytics;
