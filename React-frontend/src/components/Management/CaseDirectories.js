/*
    Component to render all the cases directories.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CaseFolderButton from '../Utils/CaseFolderButton';
import {
    Container,
    Typography,
    Box,
    Divider
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
    }
}))

function CaseDirectories() {

    // invoke custom styles
    const classes = useStyle()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                All Cases &gt; {(caseReducer.caseTree ) && caseReducer.caseTree.name}
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
