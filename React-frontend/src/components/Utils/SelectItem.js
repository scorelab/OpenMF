/*
    Matrial ui select item component.
*/

import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import {
    Select,
    MenuItem
} from '@material-ui/core';

// custom styles
const useStyle = makeStyles((theme) => ({
    select: {
        height: theme.spacing(6),
    },
    inputs: {
        '&:focus': {
            outline: 'none'
        }
    }
}))


function SelectItem({value, setValue, options, placeholder}) {

    // invoking custom style class
    const classes = useStyle()

    return (
        <Select
            id='role'
            variant='outlined'
            value={value}
            fullWidth
            displayEmpty
            className={classes.inputs}
            onChange={e => setValue(e.target.value)}
        >
            <MenuItem value='' disabled>{placeholder}</MenuItem>

            {
                options.map((item) => {
                    return (
                        <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
                    )
                })
            }

        </Select>
    )
}

export default SelectItem
