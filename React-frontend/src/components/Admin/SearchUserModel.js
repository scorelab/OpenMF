/*
    Functional component to list
    all the members(extractor and management)
    of an admin.
*/

import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    TablePagination,
} from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions/admin';
import TablePaginationActions from '../Utils/TablePaginationActions';
import { extractor_default, fetch_extracted_cases } from '../../store/actions/extractor';

// Columns for table representation
const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'verified', headerName: 'verified', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },

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

function SearchUserModel({ extractors, managements }) {

    // Invoking Classes
    const classes = useStyle()

    // history
    const history = useHistory()

    // Dispatcher
    const dispatch = useDispatch()

    // State variablef for page
    const [page, setPage] = useState(0);

    // State to store chart type
    const [tableType] = useState('extractor')

    // Row definition for members
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Number of empty rows
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allRows.length - page * rowsPerPage);

    // Handling page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handling Row per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Function to handle Double click on any row
    function handleCellClick(gridCellParam) {

        // Dispatch selected user
        dispatch(selectUser(gridCellParam))

        // Dispatch extracted cases
        if (gridCellParam.role === "extractor") {
            dispatch(fetch_extracted_cases(gridCellParam.email))
        }

        // Dispatch management related stuff
        if (gridCellParam.role === "management") {
            dispatch(extractor_default())
        }

        // Redireect to member deails
        history.push('/list-members/member/' + gridCellParam.id)
    }

    const[allRows, setRows] = useState(allRows)
    const [searched, setSearched] = useState("");

        // To get list of all users
    allRows = extractors.map((member, index) => (
            {
                id: index + 1,
                name: member.name,
                email: member.email,
                verified: (member.verified) ? 'verified' : 'Not verified',
                role: member.role,
            }
        )).concat(managements.map((member, index) => (
            {
                id: index + 1 + extractors.length,
                name: member.name,
                email: member.email,
                role: member.role,
                verified: (member.verified) ? 'verified' : 'Not verified'
            }
        )))

    // Function to handle search
    const requestSearch = (searchedVal) => {
        const filteredRows = allRows.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
      };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };

    return (
        <Container className={classes.root}>

            <h1 className={classes.title}>Search User</h1>

            <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
             />

            <TableContainer component={Paper} style={{ marginTop: '2em' }}  >
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
                            (rowsPerPage > 0
                                ? allRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : allRows
                            ).map((row) => (
                                <StyledTableRow key={row.name} onDoubleClick={() => handleCellClick(row)}>
                                    <StyledTableCell component="th" scope="row" style={{ width: 100 }} align="left">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 200 }} align="left">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 200 }} align="left">
                                        {row.email}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="left">
                                        {row.verified}
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
                                count={(tableType === 'extractor') ? allRows.length : allRows.length}
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

export default SearchUserModel
