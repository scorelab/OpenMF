/*
    Functional component to list
    all the members(extractor and management)
    of an admin.
*/

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import { WithStyles } from '@material-ui/core';
import {
    Container,
    TableContainer,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions/admin';
import MUIDataTable from "mui-datatables";
import { extractor_default, fetch_extracted_cases } from '../../store/actions/extractor';

const columnsNew = [
    { name: 'ID', options: { display: true } },
    { name: 'Full Name', options: { display: true } },
    { name: 'Email', options: { display: true } },
    { name: 'verified', options: { display: false } },
    { name: 'Role', options: { display: true } },
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
// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// Styling For rows
// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         cursor: 'pointer',
//         "&:nth-of-type(odd)": {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
// }))(TableRow);

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
    // const [tableType] = useState('extractor')

    // Row definition for members
    const [rowsPerPage, setRowsPerPage] = useState(5);

      // To get list of all users
      const allRows = extractors.map((member, index) => (
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

    // convert data from allRows to array of arrays in const newRows
    const newRows = allRows.map((row) => {
        return Object.values(row)
        }   
    )

    // const data = allRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    // const [data, setData] = useState(allRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))

    // Number of empty rows
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, allRows.length - page * rowsPerPage);

    // Handling page change
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // Handling Row per page change
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

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

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

    const options = {
        search: searchBtn,
        download: downloadBtn,
        // customToolbarSelect: () => {},
        selectableRows: false,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
        //   console.log(action);
        //   console.dir(state);
        },
        setRowProps: () => ({
            onClick: (e) => {
                console.log(e)
            }

        }),
      };

    return (
        <Container className={classes.root}>

            <h1 className={classes.title}>Search User</h1>

            {/* <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
             /> */}

            <TableContainer >
                <MUIDataTable
                title={"Search User"}
                data={newRows}
                columns={columnsNew}
                options={options}
                ondoubleClick={(e, rowData, rowIndex) => handleCellClick(newRows[rowIndex])}
                />
            </TableContainer>
           


        </Container>
    );
}

export default SearchUserModel
