import React from 'react';
import {LoginForm} from "../components/Login";
import '../css/LoginView.css'

export class LoginView extends  React.Component{

    render() {
        return (
            <div className='Login-View'>
                <div className='Login-Form'>
                    <LoginForm />
                </div>
            </div>
        );
    }
}
