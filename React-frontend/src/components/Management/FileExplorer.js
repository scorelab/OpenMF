/*
    Component to render all the cases.
*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadCases } from '../../store/actions/case';
import CaseCard from '../Extractor/CaseCard';
import {
    Container,
    Typography,
    Box
} from '@material-ui/core';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '75vw',
        minWidth: '40vw',
        maxWidth: '90vw',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    caseList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

function FileExplorer() {

    // invoke custom styles
    const classes = useStyle()

    // dispatcher
    const dispatch = useDispatch()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    // useEffect
    useEffect(() => {
        dispatch(loadCases())
    }, [dispatch])

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                All Cases
            </Typography>
            <Box component="div" className={classes.caseList}>
                {
                    (caseReducer.cases && caseReducer.cases.length > 0) ?
                        caseReducer.cases.map((caseItem) => {
                            return (<CaseCard {...caseItem} key={caseItem.case_name} />)
                        })
                    : (
                        <span> Cases Not Found.</span>
                    )
                }
            </Box>
        </Container>
    )
}

export default FileExplorer
