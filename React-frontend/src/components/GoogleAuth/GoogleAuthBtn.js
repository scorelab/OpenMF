import React from 'react';
import { GoogleLogin } from 'react-google-login';


function GoogleAuthBtn() {

    const responseGoogle = (res ) => {
        console.log(res)
        console.log(res.profileObj)
    }
    return (
        <div>
            <GoogleLogin 
                clientId=''
                buttonText='Sign with google'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuthBtn

