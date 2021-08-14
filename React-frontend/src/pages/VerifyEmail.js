/*
* A Blank page for verifing Email.
*/

// Import section
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { verifyEmail } from '../store/actions/auth';


// Main Functional Component
function VerifyEmail() {

    // Params
    const { token } = useParams()

    // History
    const history = useHistory()

    // Dispatcher
    const dispatch = useDispatch()

    // Dispatch verify email
    useEffect(() => {
        dispatch(verifyEmail(token, history))
    }, [dispatch, history, token])

    // Get auth reducer
    const { isVerifing, isVerified } = useSelector(state => state.auth)

    // Main Return
    return (
        <div style={{ padding: '2em'}}>
            {
                (isVerifing) ? (
                    <span>Email Verifing Wait...</span>
                ) : (isVerified) ? (
                    <span>Email Verified Successfully.</span>
                ) : (
                    <span>Email Verification failed, try again.</span>
                )
            }
        </div>
    )
}

export default VerifyEmail