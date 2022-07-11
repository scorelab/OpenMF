/*
* Form Component for Contact Page.
*/

// Import Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
    Container,
    Typography,
    Divider,
    TextField,
    Button,
    Box
} from '@material-ui/core';
import Layout from '../components/core/Layout';


// Custom Styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '92vh',
        marginTop: '8vh',
        padding: '2em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    titleText: {
        fontWeight: '600',
    },
    inputs: {
        width: '50%',
        minWidth: '255px',
        marginBottom: '2em'
    },
    inputLabel: {
        fontSize: '.8rem',
        marginBottom: '.2em'
    },
    buttonStyle: {
        '&:focus': {
            outline: 'none'
        }
    }
}))



function ContactForm() {
    // Contact Us Form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const { name, email, message } = formData;

    // Invoking custom styles
    const classes = useStyles()

    // params
    const { token } = useParams()

    // history
    const history = useHistory()

    // Dispatch
    const dispatch = useDispatch()

    // Get Auth reducer's loading state
    const { isSendingMessage } = useSelector(state => state.auth)


    // Handle Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendMessage(token, name, email, message, history))
    }

    // SendMessage Action
    const sendMessage = (token, name, email, message, history) => {
        fetch('/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                name,
                email,
                message
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('Message Sent!')
                    history.push('/')
                }})
    }

    return (
            <Layout sidebarBool={true}>
                <Container className={classes.root}>
                    <Typography
                        component="h1"
                        variant="h5"
                        className={classes.titleText}
                    >
                        Contact Us

                    </Typography>
                    <Divider style={{ width: '100%', margin: '2em 0' }} />
                    <Box className={classes.inputs}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.inputLabel}
                            margin="normal"
                            size="small"
                            type="text"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.inputLabel}
                            margin="normal"
                            size="small"
                            type="email"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.inputLabel}
                            margin="normal"
                            size="small"
                            type="text"
                            required
                        />
                    </Box>
                    <Box className={classes.buttonStyle}>
                        <Button
                            variant='contained'
                            size='small'
                            disableRipple
                            disableElevation
                            color='secondary'
                            disabled={isSendingMessage}
                            onClick={handleSubmit}
                        >
                            {
                                (isSendingMessage) ? (<span>Sending...</span>) : (<span>Send Message</span>)
                            }
                        </Button>
                    </Box>
                </Container>
            </Layout>
    )
}

export default ContactForm;