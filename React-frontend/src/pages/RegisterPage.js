/*
* Page for register user.
*/


// Import Dependecies
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';
import logo from '../images/logo.png';
import RegisterForm from '../components/RegisterForm';
import Layout from '../components/core/Layout';


// Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        marginTop: '10vh',
    },
    image:{
        position: 'relative',
        backgroundColor: theme.palette.primary.main,
        backgroundPosition: 'center',
        border: '1px solid black',
        backgroundImage: 'linear-gradient(to right, #000, #264d2c,#36623c, #2b7935)', 
        '&::before': {
            position: 'absolute',
            width: '50%',
            height: '50%',
            right: theme.spacing(5),
            top: theme.spacing(15),
            content: "''",
            backgroundImage: `url(${logo})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat:'no-repeat'
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}))


// Main RegisterPage component
function RegisterPage() {

    // Invoking custom styles
    const classes = useStyles()

    return (
        <Layout sidebarBool={false} background={false}>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={false} md={7} className={classes.image}/>
                <Grid item xs={12} sm={12} md={5} className={classes.form}>
                    <RegisterForm />
                </Grid>
            </Grid>
        </Layout>
    )
}

export default RegisterPage
