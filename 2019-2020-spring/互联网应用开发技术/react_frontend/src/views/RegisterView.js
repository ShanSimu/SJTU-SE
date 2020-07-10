import React from 'react';
import {RegistrationForm} from "../components/RegisterForm";
import '../css/LoginView.css'

export class RegisterView extends  React.Component{

    render() {
        return (
            <div className='Login-View'>
                <div className='Login-Form'>
                    <RegistrationForm />
                </div>
            </div>
        );
    }
}
