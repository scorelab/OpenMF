/*
* Button that would hold folder name
* and folder icon.
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
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
    }
}))


// Main Functional component
function CaseFolderButton({dirName, parentDir}) {

    // Invoke custom classes
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // History
    const history = useHistory()

    // handle double click
    const handleDoubleClick = (caseName) => {

        if(parentDir === 'file-explorer'){
            // dispatch caseTree
            dispatch(loadCaseTree(caseName))
        }

        // redirect
        history.push(`/${parentDir}/${caseName}`)
    }

    // return JSX
    return (
        <Button
            variant="outlined"
            className={classes.button}
            onDoubleClick={() => handleDoubleClick(dirName)}
            startIcon={<FolderIcon />}
        >
            {dirName}
        </Button>
    )
}

export default CaseFolderButton
