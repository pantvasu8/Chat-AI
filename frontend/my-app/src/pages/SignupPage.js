import React from 'react';
import SignupForm from '../components/SignupForm';
import '../css/LoginPage.css';

const SignupPage = () => {
    return (
        <div className="login-page">
            <h1>Signup Page</h1>
            <div className="login-form">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;

