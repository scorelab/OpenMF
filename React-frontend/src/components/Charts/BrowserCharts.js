/*
* Functional Component to show all charts
* related to Browser history.
*/

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadfile } from '../../store/actions/file';
import { Bar, Line, Polar } from 'react-chartjs-2';
import SelectItem from '../Utils/SelectItem';



// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.0)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
            outline: '1px solid slategrey'
        }
    },
    errorText: {
        fontSize: '.9rem',
        color: '#f00',
        fontWeight: '100',
        marginTop: '1em',
        marginLeft: '1em'
    }
}))


// Main Functional Component
function BrowserCharts({ filepath }) {

    // Invoking custom styles
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // State to store chart type
    const [ chartType, setChartType ] = useState('bar')

    // Loading fileContent
    useEffect(() => {
        dispatch(loadfile(filepath, 'tsv'))
    }, [dispatch, filepath])


    // Get file reducer
    const fileReducer = useSelector(state => state.file)

    // option array to display inside select box
    const options = [
        { value: 'bar', name: 'Bar' },
        { value: 'pie', name: 'Most Visited - Pie' },
        { value: 'line', name: 'Line' }
    ]

    return (
        <Box component="div" className={classes.root}>
            <SelectItem value={chartType} setValue={setChartType} options={options} />
            {
                (!fileReducer.isLoading && fileReducer.parsedData) ?
                    (chartType === 'bar') ? (
                        <Bar
                            data={{
                                labels: fileReducer.parsedData.data.map((item, index) => {
                                    return item[2]
                                }).filter((item, index) => {return index !== 0}),
                                datasets: [{
                                    label: 'Title Of Visited URLs',
                                    data: fileReducer.parsedData.data.map((item, index) => {
                                        return item[3]
                                    }).filter((item, index) => {return index !== 0}),
                                    backgroundColor: 'rgba(255, 99, 132, .9)'
                                }]
                            }}
                        />
                    ) : (chartType === 'pie') ? (
                        <Polar
                            data={{
                                labels: fileReducer.parsedData.data.map((item, index) => {
                                            return item[2]
                                        }).sort((a, b) => b[3] - a[3]).slice(0, 8),
                                datasets: [{
                                            label: 'Title Of Visited URLs',
                                            data: fileReducer.parsedData.data.map((item, index) => {
                                                    return item[3]
                                                }).sort((a, b) => b - a).slice(0, 8),
                                            backgroundColor: 'rgba(255, 99, 132, .9)'
                                    }]
                                }}
                        />
                    ) : (chartType === 'line') ? (
                        <Line
                            data={{
                                labels: fileReducer.parsedData.data.map((item, index) => {
                                    return item[2]
                                }).filter((item, index) => {return index !== 0}),
                                datasets: [{
                                    label: 'Title Of Visited URLs',
                                    data: fileReducer.parsedData.data.map((item, index) => {
                                        return item[3]
                                    }).filter((item, index) => {return index !== 0}),
                                    backgroundColor: 'rgba(255, 99, 132, .9)',
                                    fill: false,
                                    tension: 0.1
                                }]
                            }}
                        />
                    )  : (
                    <span>Loading...</span>
                ) : (
                    <Typography variant="body1" align="center" color="secondary">
                        Oops! This Case doesn't contain browser history data.
                    </Typography>
                )
            }
        </Box>
    )
}

export default BrowserCharts
