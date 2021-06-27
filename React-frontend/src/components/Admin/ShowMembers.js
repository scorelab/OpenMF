import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography
} from '@material-ui/core';

// styles
const useStyle = makeStyles((theme) => ({
    root: {

    }
}))


function ShowMembers({ extractors, managements, isLoading }) {
    const classes = useStyle()
    return (
        <Container className={classes.root}>
            <Typography component="h1" variant="body1">
                All Members
            </Typography>
            <ul>
                {extractors.map((member) => (
                    <li key={member.name}>{member.name}</li>
                ))}
            </ul>
        </Container>
    )
}

export default ShowMembers
