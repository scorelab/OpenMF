/*
    Component to render all the cases to analyse.
*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loadCases } from '../../store/actions/case';
import { useHistory } from 'react-router-dom';
import CaseFolderButton from '../Utils/CaseFolderButton';
import {
    Container,
    Typography,
    Box,
    Divider,
    Button
} from '@material-ui/core';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '80vw',
        overflowX: 'auto',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    },
    caseList: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

function Analytics() {

    // Dispatcher
    const dispatch = useDispatch()

    // useEffect
    useEffect(() => {
        dispatch(loadCases())
    }, [dispatch])

    // invoke custom styles
    const classes = useStyle()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    // history
    const history = useHistory()

    return (
        <Container component="main" className={classes.root}>

            {/* Header */}
            <Typography component="h1" variant="h5">
                <Button className={classes.title}>
                    Case Analyser
                </Button>
            </Typography>

            {/* Divider */}
            <Divider style={{width: '100%', marginTop: '1em'}} />

            {/* Rendering all cases from caseReducer */}
            <Box component="div" className={classes.caseList}>
                {
                    (caseReducer.cases && caseReducer.cases.length > 0) ?
                        caseReducer.cases.map((caseItem) => {
                            return (<CaseFolderButton key={caseItem.case_name} dirName={caseItem.case_name} parentDir='file-explorer'/>)
                        })
                    : (
                        <span> Cases Not Found.</span>
                    )
                }
            </Box>

        </Container>
    )
}

export default Analytics
