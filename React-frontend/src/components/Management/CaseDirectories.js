/*
    Component to render all the cases directories.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CaseFolderButton from '../Utils/CaseFolderButton';
import { useHistory } from 'react-router-dom';
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
    dirList: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    button: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    }
}))

function CaseDirectories() {

    // invoke custom styles
    const classes = useStyle()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    // history
    const history = useHistory()

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                <Button className={classes.button} onClick={() => history.goBack()}>All Cases</Button>&gt;
                <Button className={classes.button}>{(caseReducer.caseTree ) && caseReducer.caseTree.name}</Button>
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}} />

            <Box component="div" className={classes.dirList}>
                {
                    (caseReducer.caseTree && caseReducer.caseTree.children.length > 0) ?
                        caseReducer.caseTree.children.map((subDirectories) => {
                            return (
                                <CaseFolderButton
                                    key={subDirectories.id}
                                    dirName={subDirectories.name}
                                    parentDir={`file-explorer/${caseReducer.caseTree.name}`}
                                />
                            )
                        })
                    : (
                        <span> Empty Folder.</span>
                    )
                }
            </Box>
        </Container>
    )
}

export default CaseDirectories
