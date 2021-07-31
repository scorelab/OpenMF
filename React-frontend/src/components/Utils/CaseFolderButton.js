/*
* Button that would hold folder name
* and folder icon.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Tooltip
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import GraphEqIcon from '@material-ui/icons/GraphicEq';
import { useDispatch } from 'react-redux';
import { loadCaseTree, selectCase } from '../../store/actions/case';
import { useHistory } from 'react-router-dom';


// Custom styles
const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: '.8rem',
        color: '#555',
        fontWeight: 'bold',
        borderColor: '#666',
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        '&:focus': {
            outline: 'none'
        }
    },
    icon: {
        color: '#000',
    }
}))


// Main Functional component
function CaseFolderButton({dirName, parentDir, isAnalyser}) {

    // Invoke custom classes
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // History
    const history = useHistory()

    // handle double click
    const handleClick = (caseName) => {

        if(parentDir === 'file-explorer'){
            // dispatch caseTree
            dispatch(loadCaseTree(caseName))
        }

        if(parentDir === 'report'){
            // select the click case
            dispatch(selectCase(caseName))
        }

        // redirect
        history.push(`/${parentDir}/${caseName}`)
    }

    // return JSX
    return (
        <Button
            variant="outlined"
            className={classes.button}
            onDoubleClick={() => handleClick(dirName)}
            startIcon={(isAnalyser) ?
                <Tooltip title="Report"><GraphEqIcon className={classes.icon}/></Tooltip>
                :
                <FolderIcon />}
        >
            {dirName}
        </Button>
    )
}

export default CaseFolderButton
