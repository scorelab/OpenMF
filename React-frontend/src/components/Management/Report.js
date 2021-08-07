/*
    Component to render all the cases to analyse.
*/

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { loadCases } from "../../store/actions/case";

// import { useHistory } from 'react-router-dom';
import CaseFolderButton from "../Utils/CaseFolderButton";
import { Container, Typography, Box, Divider, Button } from "@material-ui/core";

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
  caseList: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

function Report() {
  // Dispatcher
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(loadCases());
  }, [dispatch]);

  // invoke custom styles
  const classes = useStyle();

  // get case reducer
  const caseReducer = useSelector((state) => state.case);

  // history
  // const history = useHistory()

  // Main return statement
  return (
    <Container component="main" className={classes.root}>
      <Container>
        {/* Header */}
        <Typography component="h1" variant="h6">
          <Button className={classes.title}>Case Report</Button>
        </Typography>

        {/* Divider */}
        <Divider style={{ width: "100%", marginTop: "1em" }} />

        {/* Rendering all cases from caseReducer */}
        <Box component="div" className={classes.caseList}>
          {caseReducer.cases && caseReducer.cases.length > 0 ? (
            caseReducer.cases.map((caseItem) => {
              return (
                <CaseFolderButton
                  key={caseItem.case_name}
                  dirName={caseItem.case_name}
                  parentDir="report"
                  isAnalyser={true}
                />
              );
            })
          ) : (
            <span> Cases Not Found.</span>
          )}
        </Box>
      </Container>
    </Container>
  );
}

export default Report;
