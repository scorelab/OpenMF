// Component to represent case as in a tree structure

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadCaseTree } from '../../store/actions/case';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import JsonPretty from '../Utils/JsonPretty';
import {
    Container,
    TextField,
    Button,
    InputAdornment,
    Grid
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
        marginBottom: theme.spacing(4)
    },
    tree: {
        height: theme.spacing(55),
        overflow: 'auto'
    }
}))



function CaseTreeView() {

    // Dispatcher
    const dispatch = useDispatch()

    // Get case reducer
    const caseReducer = useSelector((state) => state.case)

    // case state
    const [caseName, setCaseName] = useState('')

    // invoke custom styles
    const classes = useStyles()

    // Tree Component
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)): null}
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
                <Grid item xs={12} md={4}>

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
                            <span>{caseReducer.error}</span>
                        ) : (
                            <span>Please Provide Case Name.</span>
                        )
                    }

                </Grid>
                <Grid item xs={12} md={8}>

                    {/* Render CaseTree in Pretty Json format */}
                    <JsonPretty data={caseReducer.caseTree}/>

                </Grid>
            </Grid>

        </Container>
    )
}

export default CaseTreeView
