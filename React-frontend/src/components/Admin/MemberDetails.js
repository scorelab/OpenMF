/*
    Functional component to show
    details of a selected member.
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import memberIcon from '../../images/memberIcon.png';
import CaseCard from '../Extractor/CaseCard';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '75vw',
        minWidth: '40vw',
        maxWidth: '90vw',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    title: {
        fontWeight: 600,
    },
    profileSection: {
        height: '80vh',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    caseSection: {
        height: '80vh',
        padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
        overflowY: 'auto'
    },
    button: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        '&:focus': {
            outline: 'none',
            border: 'none'
        }
    },
    text: {
        'marginTop': theme.spacing(1),
        fontWeight: '500'
    }
}))



function MemberDetails() {
    const classes = useStyle()

    // Get selected member from admin reducer
    const member= useSelector(state => state.admin.selected_user)

    // Get extracted cases of a extractor member
    const cases = useSelector(state => state.extractor.extracted_cases)

    // If member and cases aren't updated in state
    if(!member){
        return (
            <Container className={classes.root}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    All Members
                </Typography>
                <CircularProgress  style={{ margin: '40vh 35vw' }}/>
            </Container>
        )
    }

    // if member and cases state have been updated completely
    return (
        <Container className={classes.root}>

            <Typography component="h1" variant="h5" className={classes.title}>
                All Members &gt; Extractor &gt; {member.email}
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={4} className={classes.profileSection}>
                    <img src={memberIcon} alt="memberIcon"/>
                    <Typography component="h1" variant="h4" className={classes.text}>
                        {member.name}
                    </Typography>
                    <Typography component="h5" variant="body2" className={classes.text}>
                        {member.role}
                    </Typography>
                    <Typography component="h5" variant="body2" className={classes.text}>
                        {member.email}
                    </Typography>
                    <Typography component="h5" variant="body2" className={classes.text}>
                        {member.created_at}
                    </Typography>
                    <Grid container>
                        <Grid item>
                            <Button
                                disableElevation
                                variant="outlined"
                                color="primary"
                                className={classes.button}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                disableElevation
                                variant="contained"
                                color="secondary"
                                className={classes.button}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>



                {/*
                    Display the extracted cases only if
                    the role of selected memer is extractor
                */}
                {member.role === 'extractor' &&
                    ((cases) ? (
                        <Grid item  xs={12} sm={12} md={6} lg={8} className={classes.caseSection}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Extracted Cases
                            </Typography>
                            {(cases.length > 0) ? (
                                cases.map((c) => {
                                    return (
                                        <CaseCard {...c}/>
                                    )
                                })
                            ) : (
                                <span> No Cases Found. </span>
                            )
                            }
                        </Grid>
                    ) : (
                        <CircularProgress style={{ marginTop: '30vh', marginLeft: '20vw'}}/>
                    ))
                }
            </Grid>

        </Container>
    )
}

export default MemberDetails
