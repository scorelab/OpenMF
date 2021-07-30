/*
* Functional component to render TXT data.
*/

import React from 'react';
import {
    Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// custom styles
const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'auto'
    },
    textContainer: {
        marginTop: theme.spacing(2)
    },
    text: {
        fontSize: '.8rem'
    }
}))


function ShowTSV({data}) {

    // Invoke Custom styles
    const classes = useStyles()

    // parse the data string
    const cells = data.split('\n').map(item => (item.split('], [')))

    // Iterate through all the text lines
    return (
        <Container className={classes.root}>
            {

                // Rendering all the lines of items cells[0]
                (cells) && cells[0].map((item, index) => {
                    return (
                        <div key={index} className={classes.textContainer}>
                            <p className={classes.text}>{index+1}. {item.replace(/'/g, " ").replace("[[","").replace(",", ":").replace("]]", " ")}</p>
                        </div>
                    )
                })

            }

            </Container>
    )
}

export default ShowTSV



