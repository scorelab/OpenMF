import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons/Facebook';
import './facebookAuth.css';
export default class FacebookAuthBtn extends Component {
    responseFacebook = (res) => {
        console.log(res)
    }
    loginError = (e) => {
        console.log(e)
    }
    render() {
        return (
            <div>
                <FacebookLogin 
                    appId=''
                    onFailure={this.loginError}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass='facebook-button-class'
                    styles={this.styles}
                    icon={<FacebookIcon color='primary'/>}
                />
            </div>
        )
    }
}
