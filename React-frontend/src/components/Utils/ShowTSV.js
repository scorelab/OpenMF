/*
* Functional component to render TSV data.
*/

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { parse } from 'papaparse';

// custom styles
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(1),
        overflow: 'auto'
    },
    table: {
        minWidth: 650,
    },
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
        height: '5vh',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


function ShowTSV({data}) {

    // State to hold parsed form
    const [ rows, setRows ] = useState(null)

    // Invoke Custom styles
    const classes = useStyles()

    // useEffect
    useEffect(() => {
        parse(data, {
            download: false,
            skipEmptyLines: true,
            complete: function(res, file){
                setRows(res.data)
            }
        })
    }, [data])

    // Row definition for header row
    const headerRow = rows && rows[0].map((file, index) => {
        return file
    })

    // Row definition for Content Rows
    const contentRows = rows && rows.filter((item, index) => (index !== 0))

    return (
            <TableContainer component={Paper} className={classes.paper}>
                <Table stickyHeader className={classes.table} aria-label="tsv table">

                    <TableHead >
                        <StyledTableRow >
                            {
                                (headerRow) && headerRow.map((title, index) => {
                                    return (<StyledTableCell align="left" key={index}>{title}</StyledTableCell>)
                                })
                            }
                        </StyledTableRow>
                    </TableHead>

                    <TableBody >

                        {(contentRows) && contentRows.map((row, index) => (
                            <StyledTableRow key={index}>
                            {
                                (row.map((item, index) => (
                                    <StyledTableCell component="th" scope="row" key={index}>
                                        {item}
                                    </StyledTableCell>
                                )))

                            }
                            </StyledTableRow>
                        ))}

                    </TableBody>

                </Table>

            </TableContainer>
    )
}

export default ShowTSV
