/*
* Button that would hold folder name
* and folder icon.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import GraphEqIcon from '@material-ui/icons/GraphicEq';
import { useDispatch } from 'react-redux';
import { loadCaseTree } from '../../store/actions/case';
import { useHistory } from 'react-router-dom';


// Custom styles
const useStyles = makeStyles((theme) => ({
    button: {
        color: '#888',
        borderColor: '#666',
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        '&:focus': {
            outline: 'none'
        }
    },
    iconButton: {
        color: '#000',
        width: theme.spacing(2),
        height: theme.spacing(2),
        marginRight: '.5em',
        '&:focus': {
            outline: 'none'
        }
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

        // redirect
        history.push(`/${parentDir}/${caseName}`)
    }

    // OnMouseDown handler
    const handleOnMouseDown = (e) => {
        e.stopPropagation()
    }

    // return JSX
    return (
        <Button
            variant="outlined"
            className={classes.button}
            onDoubleClick={() => handleClick(dirName)}
            startIcon={(isAnalyser) ? null : <FolderIcon />}
        >
            {
                (isAnalyser)
                &&
                (<IconButton
                    onMouseDown={handleOnMouseDown}
                    className={classes.iconButton}
                    onClick={() => handleClick(dirName)}
                >
                    <Tooltip title="Analyse">
                        <GraphEqIcon />
                    </Tooltip>
                </IconButton>)
            }
            {dirName}
        </Button>
    )
}

export default CaseFolderButton
