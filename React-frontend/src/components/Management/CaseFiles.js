/*
    Component to render all the cases directory's files.
*/

import React from 'react';
import { withStyles ,makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    Button
} from '@material-ui/core';
import { loadfile } from '../../store/actions/file';


// custom styles
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
    dirList: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    paper: {
        marginTop: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
    button: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    }
}))


// styled table cell
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

// styled table row
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#aaa'
      }
    },
}))(TableRow);


// Main functional component
function CaseFiles() {

    // invoke custom styles
    const classes = useStyles()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    // dispatcher
    const dispatch = useDispatch()

    // params
    const params = useParams()

    // history
    const history = useHistory()

    // destructure params
    const { caseName, dirName } = params

    // get file of respective directory
    const files = (caseReducer.caseTree) && caseReducer.caseTree.children.filter(item => item.name === dirName)[0]

    // Row definition for files row
    const filesRow = files.children.map((file, index) => (
        {
            id: index+1,
            name: file.name,
            lastAccessTime: file.lastAccessTime,
            size: file.size,
            path: file.path
        }
    ))

    // Functional to handle double click
    const handleDoubleClick = (rowItem) => {

        // dispatch laod file action
        dispatch(loadfile(rowItem.path, dirName))

        // redirect to show file page
        history.push(`/file-explorer/${caseName}/${dirName}/${rowItem.name}`)

    }

    return (
        <Container component="main" className={classes.root}>

            <Typography component="h1" variant="h5">
                <Button className={classes.button} onClick={() => history.push('/file-explorer')}>All Cases</Button>&gt;
                <Button className={classes.button} onClick={() => history.goBack()}>{caseName}</Button>&gt;
                <Button className={classes.button} >{dirName}</Button>
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            <TableContainer component={Paper} className={classes.paper}>
                <Table stickyHeader className={classes.table} aria-label="file table">

                    <TableHead >
                        <StyledTableRow >
                            <StyledTableCell>File Name</StyledTableCell>
                            <StyledTableCell align="left">Size</StyledTableCell>
                            <StyledTableCell align="left">Last Visited</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody >

                        {filesRow.map((row) => (
                            <StyledTableRow key={row.name} onDoubleClick={() => handleDoubleClick(row)}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.size}</StyledTableCell>
                            <StyledTableCell align="left">{row.lastAccessTime}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>

                </Table>

            </TableContainer>
        </Container>
    )
}

export default CaseFiles
