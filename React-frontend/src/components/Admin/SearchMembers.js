/*
    Functional component to search from the list
    all the members(extractor and management)
    of an admin.
*/

import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  TextField
} from '@material-ui/core';
import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions/admin';
import TablePaginationActions from '../Utils/TablePaginationActions';
import { extractor_default, fetch_extracted_cases } from '../../store/actions/extractor';

// Columns for table representation
const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full Name', flex:1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'varified', headerName: 'Varified', flex:1},
    { field: 'role', headerName: 'Role', flex: 1},

]

// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 600,
    },
    table: {
        height: '41vh',
        width: '70vw',
        minWidth: '50vw',
        maxWidth: '100vw',
        '&:focus': {
            outline: 'none',
            border: 'none'
        }
    },
    button: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    }
}))

// Styling For cells
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);


// Styling For rows
const StyledTableRow = withStyles((theme) => ({
    root: {
        cursor: 'pointer',
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const SearchMembers = ({ extractors, managements}) => {

    // Invoking Classes
    const classes = useStyle()

    // history
    const history = useHistory()

    // Dispatcher
    const dispatch = useDispatch()

    // State variablef for page
    const [page, setPage] = useState(0);

    const [showUser, setShowUser] = useState([]);
    const member = useRef(null);

    // Row definition for extractor members
    const extractorRows = extractors.map((member, index) => (
      {
          id: index+1,
          name: member.name,
          email: member.email,
          varified: (member.varified) ? 'Varified': 'Not Varified',
          role: member.role,
      }
  ))

  // Row definition for management members
  const managementRows = managements.map((member, index) => (
      {
          id: index+1,
          name: member.name,
          email: member.email,
          role: member.role,
          varified: (member.varified) ? 'Varified': 'Not Varified'
      }
  ))

  const allMembers = managementRows.concat(extractorRows).map((member, index) => (
    {
      id: index+1,
      name: member.name,
      email: member.email,
      role: member.role,
      varified: (member.varified) ? 'Varified': 'Not Varified'
  }))

  const sliceMembers = (page, rowsPerPage) => 
    allMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    setShowUser(sliceMembers(page, rowsPerPage))
  },[extractors])

    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Number of empty rows
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allMembers.length - page * rowsPerPage);

    // Handling page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        setShowUser(sliceMembers(newPage, rowsPerPage))
    };

    // Handling Row per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setShowUser(sliceMembers(0, event.target.value))
    };

    // Function to handle Double click on any row
    function handleCellClick(gridCellParam){

        // Dispatch selected user
        dispatch(selectUser(gridCellParam))

        // Dispatch extracted cases
        if(gridCellParam.role === "extractor"){
            dispatch(fetch_extracted_cases(gridCellParam.email))
        }

        // Dispatch management related stuff
        if(gridCellParam.role === "management"){
            dispatch(extractor_default())
        }

        // Redireect to member deails
        history.push('/list-members/member/'+gridCellParam.id)
    }

    function handleInput() {
      if (member.current.value.length === 0) {
        setShowUser(sliceMembers(page, rowsPerPage))
      } else {
        setShowUser(sliceMembers(page, rowsPerPage).filter(ele => {
          return ele.name.startsWith(member.current.value) 
        }))
      }
    }

    return (
        <Container className={classes.root}>
            <TextField id="outlined-basic" label="search member" variant="outlined" 
            fullWidth inputRef={member} onChange={handleInput}/>
            <TableContainer component={Paper} style={{ marginTop: '2em'}} >
                <Table className={classes.table}>
                    <TableHead>
                        <StyledTableRow>
                            {(columns.map((column) => {
                                return (
                                    <StyledTableCell align="left" key={column.field}>{column.headerName}</StyledTableCell>
                                )
                            }))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                                (showUser
                                ).map((row) => (
                                    <StyledTableRow key={row.name} style={{ cursor: 'pointer'}} onDoubleClick={() => handleCellClick(row)}>
                                        <StyledTableCell component="th" scope="row" style={{ width: 100}} align="left">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 200 }} align="left">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 200 }} align="left">
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 160 }} align="left">
                                            {row.varified}
                                        </StyledTableCell>
                                        <StyledTableCell style={{ width: 160 }} align="left">
                                            {row.role}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        }

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                    </TableBody>

                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={allMembers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>

                </Table>
            </TableContainer>
        </Container>
    );
}

export default SearchMembers
