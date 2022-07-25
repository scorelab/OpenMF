/*
    Functional component to list
    all the members(extractor and management)
    of an admin.
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TableContainer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../store/actions/admin";
import MUIDataTable from "mui-datatables";
import {
    extractor_default,
    fetch_extracted_cases,
} from "../../store/actions/extractor";

// Declare columns
const columns = [
    { name: "ID", options: { display: true } },
    { name: "Full Name", options: { display: true } },
    { name: "Email", options: { display: true } },
    { name: "verified", options: { display: true } },
    { name: "Role", options: { display: true } },
];

// Styles for Table Columns
columns.forEach((column) => {
    column.options = {
        setCellProps: () => ({
            style: {
                minWidth: "200px",
                maxWidth: "800px",
                width: "100%",
                responsive: "Scroll",
            },
        }),
        customBodyRender: (data, type, row) => {
            return <pre>{data}</pre>;
        },
        display: true,
        responsive: true,
    };
});

// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: "10vh",
        height: "82.5vh",
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    title: {
        fontWeight: 600,
    },
    table: {
        height: "41vh",
        width: "70vw",
        minWidth: "50vw",
        maxWidth: "100vw",
        "&:focus": {
            outline: "none",
            border: "none",
        },
    },
    button: {
        fontSize: ".8rem",
        fontWeight: "bolder",
        "&:focus": {
            outline: "none",
        },
    },
}));

function SearchUserModel({ extractors, managements }) {
    // Invoking Classes
    const classes = useStyle();

    // history
    const history = useHistory();

    // Dispatcher
    const dispatch = useDispatch();

    // State variable MUI Data Table
    const [tableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight] = useState("");
    const [searchBtn] = useState(true);
    const [downloadBtn] = useState(true);
    const [printBtn] = useState(true);
    const [viewColumnBtn] = useState(true);
    const [filterBtn] = useState(true);

    // Options for MUI Data Table
    const options = {
        search: searchBtn,
        download: downloadBtn,
        selectableRows: false,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        tableBodyHeight,
        tableBodyMaxHeight,
        responsive: "scrollMaxHeight",
    };

    // Function to handle Double click on any row
    function handleCellClick(gridCellParam) {
        // Dispatch selected user
        dispatch(selectUser(gridCellParam));

        // Dispatch extracted cases
        if (gridCellParam.role === "extractor") {
            dispatch(fetch_extracted_cases(gridCellParam.email));
        }

        // Dispatch management related stuff
        if (gridCellParam.role === "management") {
            dispatch(extractor_default());
        }

        // Redireect to member deails
        history.push("/list-members/member/" + gridCellParam.id);
    }

    // call handleCellClick for each row on double click
    columns.forEach((column) => {
        column.options.customBodyRender = (data, type, row) => {
            console.log("data, type, row", data, type, row);
            return <pre onDoubleClick={() => handleCellClick(row)}>{data}</pre>;
        };
    });

    // To get list of all users
    const allRows = extractors
        .map((member, index) => ({
            id: index + 1,
            name: member.name,
            email: member.email,
            verified: member.verified ? "verified" : "Not verified",
            role: member.role,
        }))
        .concat(
            managements.map((member, index) => ({
                id: index + 1 + extractors.length,
                name: member.name,
                email: member.email,
                verified: member.verified ? "verified" : "Not verified",
                role: member.role,
            }))
        );

    // Collection of all rows
    const newRows = allRows.map((row) => {
        return Object.values(row);
    });

    console.log(newRows);
    return (
        <Container className={classes.root}>
            <h1 className={classes.title}>Search User</h1>
            <TableContainer>
                <MUIDataTable
                    title={"Search Results"}
                    data={newRows}
                    columns={columns}
                    options={options}
                    onCellClick={(e, rowData, rowIndex) => {}}
                />
            </TableContainer>
        </Container>
    );
}

export default SearchUserModel;
