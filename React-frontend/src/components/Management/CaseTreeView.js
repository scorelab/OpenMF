// Component to represent case as in a tree structure

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadCaseTree, loadDefaultState } from '../../store/actions/case';
import { loadDefaultFileState, loadfile } from '../../store/actions/file';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import JsonPretty from '../Utils/JsonPretty';
import ShowTXT from '../Utils/ShowTXT';
import ShowTSV from '../Utils/ShowTSV';
import {
    Container,
    TextField,
    Button,
    InputAdornment,
    Grid,
    Tooltip
} from '@material-ui/core';
import {
    TreeItem,
    TreeView
} from '@material-ui/lab';



// custom styles
const useStyles = makeStyles((theme) => ({
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
    input: {
        marginBottom: theme.spacing(2)
    },
    tree: {
        height: theme.spacing(55),
    },
    dullText: {
        fontSize: '.6rem',
        fontWeight: '400',
        color: '#444'
    },
    rightUpperPart: {
        overflowX: 'auto',
        overflowY: 'auto',
        height: '68vh',
        '&::-webkit-scrollbar': {
            width: '0px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
            outline: '1px solid slategrey'
        }
    },
    treeSidebar: {
        overflowX: 'auto',
        overflowY: 'auto',
        height: '68vh',
        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
        '&::-webkit-scrollbar': {
            width: '0px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
            outline: '1px solid slategrey'
        }
    },
    treeItem: {
        fontSize: '.8rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block'
    },
    rightPart: {
        height: '80vh'
    },
    preStyle: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    }
}))



function CaseTreeView() {

    // Dispatcher
    const dispatch = useDispatch()

    // Get case reducer
    const caseReducer = useSelector((state) => state.case)

    // get file Reducer
    const fileReducer = useSelector(state => state.file)

    // case state
    const [caseName, setCaseName] = useState('')

    // invoke custom styles
    const classes = useStyles()

    // dispatch default state of caseReducer
    useEffect(() => {
        dispatch(loadDefaultState())
        dispatch(loadDefaultFileState())
    }, [dispatch])

    // Tree Component
    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={String(nodes.id)}
            label={
                <>
                    <Tooltip title={nodes.name} arrow>
                        <span style={{fontSize: '.8rem'}}>{nodes.name}</span>
                    </Tooltip>
                    <span className={classes.dullText}>
                        {nodes.size}
                    </span>
                </>
            }
            className={classes.treeItem}
            onClick={() => (nodes.type === 'file') && dispatch(loadfile(nodes.path, nodes.extension))}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    // Check if case reducer is loaded or not
    return (
        <Container className={classes.root}>
            <TextField
                value={caseName}
                onChange={e => setCaseName(e.target.value)}
                label='Enter Case Name'
                name='caseName'
                id='caseName'
                size='medium'
                margin='normal'
                variant='outlined'
                fullWidth
                className={classes.input}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!caseName}
                                disableElevation
                                disableRipple
                                disableFocusRipple
                                onClick={() => {
                                    dispatch(loadCaseTree(caseName))
                                    setCaseName('')
                                }}
                            >
                                {(!caseReducer.isLoading) ? (<span>Create Case Tree </span>): (<span>Creating...</span>)}
                            </Button>
                        </InputAdornment>
                    )
                }}
            />

            <Grid container>
                <Grid item xs={12} md={2} className={classes.treeSidebar}>

                    {/* Render Case Tree */}
                    {
                        (!caseReducer.isLoading && caseReducer.caseTree) ? (
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpanded={['root']}
                                defaultExpandIcon={<ChevronRightIcon />}
                                className={classes.tree}
                            >
                                {renderTree(caseReducer.caseTree)}
                            </TreeView>
                        ) : (caseReducer.error) ? (
                            <span style={{fontSize: '.8rem'}}>{caseReducer.error}</span>
                        ) : (
                            <span style={{fontSize: '.8rem'}}>Please Provide Case Name.</span>
                        )
                    }

                </Grid>
                <Grid item xs={12} md={10} className={classes.rightUpperPart}>

                    {/* Render CaseTree in Pretty Json format */}
                    {
                        (caseReducer.isLoading || !caseReducer.caseTree ||fileReducer.isLoading || !fileReducer.file || !fileReducer.fileType) ? (
                            <JsonPretty data={caseReducer.caseTree}/>
                        ) : (fileReducer.fileType === 'report' || fileReducer.fileType === 'txt') ? (
                            <ShowTXT data={fileReducer.file} className={classes.rightPart}/>
                        ) : (fileReducer.fileType === 'tsv') ? (
                            <ShowTSV data={fileReducer.file} className={classes.rightPart}/>) : (
                                <pre className={classes.preStyle}>{fileReducer.file}</pre>
                            )
                    }

                </Grid>
            </Grid>

        </Container>
    )
}

export default CaseTreeView
