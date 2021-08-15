/*
* Extract Data Form
* It will be mounted over
* ExtractDataModel
*/


// Importing Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Button,
    Typography,
    TextField,
    Card,
} from '@material-ui/core';
import SelectItem from '../Utils/SelectItem';
import { extractData } from '../../store/actions/extract';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


// Custom Styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2, 4),
        width: "350px",
        backgroundColor: '#fdfdfd'
    },
    error: {
        fontSize: '.8rem',
        fontWeight: '200'
    },
    inputs: {
        height: theme.spacing(6),
        '&:focus': {
            outline: 'none'
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.primary.extraLight,
        margin: theme.spacing(1.5, 0),
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))

// ExtractDataForm Component
function ExtractDataForm({ toggleExtractDataModel }) {

    // invoking custom styles
    const classes = useStyles()

    // history
    const history = useHistory()

    // getting admin reducer
    const extract = useSelector(state => state.extract)

    // dispatcher
    const dispatch = useDispatch()

    // Input states
    const [caseName, setCaseName] = useState('')
    const [caseType, setCaseType] = useState('')
    const [tags, setTags] = useState('')

    // function to handle add member request
    function handleExtractData(){
        dispatch(extractData(extract.deviceID, caseName, caseType, tags, history,toggleExtractDataModel ))
        setCaseName('')
        setCaseType('')
        setTags('')
    }

    // option array to display inside select box
    const options = [
        { value: 'all', name: 'All' },
        { value: 'facebook', name: 'Facebook' },
        { value: 'whatsapp', name: 'WhatsApp' },
        { value: 'message', name: 'Message' },
        { value: 'phone', name: 'Phone' },
        { value: 'browser', name: 'Browser' },
        { value: 'report', name: 'Report' },
        { value: 'bluetooth', name: 'BlueTooth' },
        { value: 'media', name: 'Media' },
        { value: 'location', name: 'Location'}
    ]

    // Return Statement
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.paper}>

                <Typography variant="h6">
                    Enter Case Details
                </Typography>

                <Typography variant="body2" align="center" color="error" className={classes.error}>
                    {extract.error}
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="casename"
                        label="Case Name"
                        name="casename"
                        autoFocus
                        className={classes.inputs}
                        value={caseName}
                        onChange={e => setCaseName(e.target.value)}
                    />

                    <SelectItem
                        value={caseType}
                        setValue={setCaseType}
                        options={options}
                        placeholder='Select Case Type'
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="tags"
                        name="tags"
                        label="Tags"
                        autoFocus
                        className={classes.inputs}
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        helperText="Use Comma for multiple tags."
                        style={{marginBottom: "2em"}}
                    />

                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={ !caseName || !caseType || !tags ||extract.isLoading}
                        onClick={handleExtractData}
                    >
                        {(extract.isLoading) ? (<span>Extracting...</span>) : (<span>Extract Data</span>)}
                    </Button>
                </form>

            </Card>

        </Container>
    )
}

export default ExtractDataForm
