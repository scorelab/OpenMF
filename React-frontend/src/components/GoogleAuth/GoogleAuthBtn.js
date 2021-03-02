import React from 'react';
import { GoogleLogin } from 'react-google-login';


function GoogleAuthBtn() {

    const responseGoogle = (res ) => {
        console.log(res)
    }

    const errorResponse = (e) =>{
        console.log(e)
    }
    return (
        <div>
            <GoogleLogin 
                clientId='' 
                buttonText='Sign with google'
                onSuccess={responseGoogle}
                onFailure={errorResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuthBtn

