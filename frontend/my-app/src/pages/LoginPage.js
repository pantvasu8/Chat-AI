import React from 'react';
import LoginForm from '../components/LoginForm';
import '../css/LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <div className="login-form">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;

