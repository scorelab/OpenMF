/*
* AboutPage Component
*/

import React from 'react'
import Layout from '../components/core/Layout'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import logo from '../images/HomeLogo.png';


// Custom Styles
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        padding: '0'
    },
    left: {
        width: '35%',
        height: '82.5vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        margin: `${theme.spacing(3)}px 0`
    },
    buttons: {
        width: '40%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3)
    },
    Btn: {
        backgroundColor: theme.palette.primary.extraLight,
        color: '#fff',
        width: '100px',
        height: '40px',
        borderRadius: theme.spacing(2),
        textAlign: 'center',
        lineHeight: '40px',
        border: 'none',
        outline: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        '&:focus': {
            outline: 'none'
        }
    },
    knowMoreBtn: {
        width: '140px',
        height: '40px',
        fontWeight: 'bold',
        borderRadius: theme.spacing(2),
        textAlign: 'center',
        lineHeight: '30px',
    },
    right: {
        position: 'relative',
        width: '65%',
        height: '82.5vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightInner: {
        width: '80%',
        height: '80%',
        borderRadius: theme.spacing(2),
        backgroundColor: '#fafafa',
        padding: theme.spacing(5),
        clipPath: 'circle(10% at 0% 0%)',
        transition: 'clip-path .4s ease-in',
        zIndex: 999,
        '&:hover': {
            clipPath: 'circle(150% at 0% 0%)'
        },
    },
    rightInner2: {
        position: 'absolute',
        width: '80%',
        minHeight: '80%',
        borderRadius: theme.spacing(2),
        backgroundColor: '#fff',
        padding: theme.spacing(5),
    },
    title: {
        fontSize: theme.spacing(3),
        fontWeight: 'bold',
        marginBottom: theme.spacing(3),
    },
    textBody: {
        fontSize: theme.spacing(1.5),
        fontWeight: 600,
        color: '#909090'
    }
}))


const AboutPage = () => {

    // Invoking Custom Styles
    const classes = useStyles()

    return (
        <Layout sidebarBool={true}>
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} className={classes.left}>
                        <img src={logo} alt="openMF" className={classes.logo} />

                    </Grid>
                    <Grid item xs sm md={8} className={classes.right}>
                        <div className={classes.rightInner2}>
                            <Typography
                                component="h1"
                                variant="body1"
                                className={classes.title}
                            >
                                OpenMF
                            </Typography>
                            <Typography
                                component="h2"
                                variant="body2"
                                className={classes.textBody}
                            >
                                OpenMF is an open source forensic tool for Android
                                smartphones that helps digital forensic investigators
                                throughout the life cycle of digital forensic investigation.
                            </Typography>
                            <br />
                            <br />
                            <Typography
                                component="h6"
                                variant="body2"
                                className={classes.textBody}
                            >
                                For e.g. let us say we have a crime scene in which we have
                                captured some suspects and we have their mobile phones.
                                If we want to extract all the data from their phones
                                and see which of them are actually involved in the crime
                                scene then we require a software to perform this task and
                                produce Meaningful evidence and Analysis report for every
                                phone (Digital forensic case).
                            </Typography>
                        </div>
                        <div className={classes.rightInner}>
                            <Typography component="h1" variant="body1" className={classes.title}>
                                How OpenMF Works ?
                            </Typography>
                            <Typography component="h6" variant="body2" className={classes.textBody}>
                                Login as either Admin, Management or Extractor based on your puspose.
                            </Typography>
                            <br />
                            <br />
                            <Typography component="h6" variant="body2" className={classes.textBody}>
                                As admin, then you can add new users, manage users and their roles. Declare and Manage tasks.
                                <br />
                                As Management, You can access, analyse, and report on the data collected from the users.
                                <br />
                                As Extractor, you have the ability and permissions to perform extractions on the connected devices.

                            </Typography>
                            <br />
                            <br />
                            <Typography component="h6" variant="body2" className={classes.textBody}>
                                OpenMF allows you to study data in various formats and perform various operations on it. With easy
                                to use interface, you can perform various operations on the data.
                            </Typography>
                            <br />
                            <br />
                            <Typography component="h6" variant="body2" className={classes.textBody}>
                                All the data is classified and seperated using tags and stored in a database, to allow easy access and analysis.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default AboutPage
