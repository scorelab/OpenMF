/*
    Functional component to show
    details of a selected member.
*/

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import memberIcon from '../../images/memberIcon.png';
import CaseCard from '../Extractor/CaseCard';
import DeleteUserModal from './DeleteUserModal';
import RoleUpdateModel from './RoleUpdateModel';


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
    headerButton: {
        fontSize: '.8rem',
        fontWeight: 'bolder',
        '&:focus': {
            outline: 'none'
        }
    },
    text: {
        'marginTop': theme.spacing(1),
        fontWeight: '500'
    }
}))



function MemberDetails() {

    // Invoke custom styles
    const classes = useStyle()

    // history
    const history = useHistory()

    // state variable for opening and closing models
    const [isDeleteModelOpen, setToggleShowDeleteModel] = useState(false)
    const [isRoleUpdateModelOpen, setToggleShowRoleUpdateModel] = useState(false)

    // Get selected member from admin reducer
    const member= useSelector(state => state.admin.selected_user)

    // isloading state from admin
    const isLoading = useSelector(state => state.admin.isLoading)

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
                <Button className={classes.headerButton} onClick={() => history.push('/list-members')}>All Members</Button>&gt;
                <Button className={classes.headerButton} onClick={() => history.goBack()}>{member.role}</Button>&gt;
                <Button className={classes.headerButton} >{member.email}</Button>
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
                                className={classes.button}
                                onClick={() => setToggleShowRoleUpdateModel(true)}
                                disabled={(isLoading) ? true: false}
                            >
                                Edit Role
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                disableElevation
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                disabled={(isLoading) ? true: false}
                                onClick={() => setToggleShowDeleteModel(true)}
                                >
                                Delete
                            </Button>
                        </Grid>

                    </Grid>

                </Grid>

                {/*
                    Models for deleteUser and RoleUpdate
                 */}
                <DeleteUserModal
                    isOpen={isDeleteModelOpen}
                    toggleShowDeleteModel={setToggleShowDeleteModel}
                    key="deleteUserModel"
                />
                <RoleUpdateModel
                    isOpen={isRoleUpdateModelOpen}
                    toggleUpdateRoleModel={setToggleShowRoleUpdateModel}
                    key="roleUpdateModel"
                />

                {/*
                    Display the extracted cases only if
                    the role of selected memer is extractor
                */}
                {
                    (member.role === 'extractor') && (
                        <Grid item  xs={12} sm={12} md={6} lg={8} className={classes.caseSection}>

                            <Typography component="h1" variant="h5" className={classes.title}>
                                Extracted Cases
                            </Typography>

                            {
                                (cases) ? (
                                    (cases.length > 0) ? (
                                        cases.map((c) => {
                                            return (
                                                <CaseCard {...c} key={c.case_name}/>
                                            )
                                        })
                                    ): (
                                        <span> No Cases Extracted. </span>
                                    )
                                ) : (
                                    <span> No Cases Found. </span>
                                )
                            }

                        </Grid>
                    )
                }
            </Grid>

        </Container>
    )
}

export default MemberDetails
