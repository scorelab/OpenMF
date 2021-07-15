/*
* Component to show content of a particular file.
*/

import React from 'react';
import {
    Container,
    Typography,
    Button,
    Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShowTSV from '../Utils/ShowTSV';
import ShowTXT from '../Utils/ShowTXT';

// Custom styles
const useStyles = makeStyles((theme) => ({
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
    button: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    }
}))


function ShowFile() {

    // Invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // params object
    const params = useParams()

    // destructure params
    const { caseName, dirName, fileName } = params

    // get caseReducer
    const caseReducer = useSelector(state => state.case)

    return (
        <Container className={classes.root}>

            <Typography component="h1" variant="h5">
                <Button className={classes.button} onClick={() => history.push('/file-explorer')}>All Cases</Button>&gt;
                <Button className={classes.button} onClick={() => history.push(`/file-explorer/${caseName}`)} >{caseName}</Button>&gt;
                <Button className={classes.button} onClick={() => history.goBack()}>{dirName}</Button>&gt;
                <Button className={classes.button} >{fileName}</Button>
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            {
                (caseReducer.isLoading) ? (<span>Loading...</span>) :
                    (dirName === 'tsv') ? (<ShowTSV data={caseReducer.file} />) :
                    (dirName === 'report') ? (<ShowTXT data={caseReducer.file} />) :
                    (<pre>{caseReducer.file}</pre>)
            }
        </Container>
    )
}

export default ShowFile
