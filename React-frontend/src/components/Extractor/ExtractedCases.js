/*
* Component to show ExtractedCases that would be wrapped inside
* ExtractedCasesPage page.
*/


// Importing Dependencies
import React, { useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider,
    Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_my_extracted_cases } from '../../store/actions/extractor';
import CaseCard from './CaseCard';

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
        alignItems: 'flex-start',
    },
    devices: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },
    button: {
        marginLeft: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        '&:focus': {
            outline: 'none'
        }
    },
    cases: {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridColumnGap: theme.spacing(3),
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0px'
        }
    }
}))


// Main functional component
function ExtractedCases() {

    // Invoking custom classes
    const classes = useStyles()

    // Dispatcher
    const dispatch = useDispatch()

    // Get Extractor reducer
    const { is_loading, extracted_cases } = useSelector(state => state.extractor)

    // dispatch fetch_extracted_cases
    useEffect(() => {
        dispatch(fetch_my_extracted_cases())
    }, [dispatch])


    // Main return statement
    return (
        <Container className={classes.root}>
            <Typography component="h1" variant="h5">
                Extracted Cases
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}}/>

            <Box component="div" className={classes.cases}>

                {
                    // Check if loading
                    (is_loading) ? (
                        <span>Loading...</span>
                    ) :
                    // If content loaded
                    extracted_cases && extracted_cases.length > 0 ?
                        extracted_cases.map((caseItem, index) => {
                            return (
                                <CaseCard
                                    key={index}
                                    {...caseItem}
                                />
                            )
                        }) : (
                            <span>You Don't Have Any Extracted Case.</span>
                        )
                }

            </Box>
        </Container>
    )
}

export default ExtractedCases
