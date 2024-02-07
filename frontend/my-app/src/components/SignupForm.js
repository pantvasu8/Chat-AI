import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        console.log('Button clicked');
        try {
            const userData = { username, password };
            await api.userSignup(userData);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Signup error:', error.response.data);
            } else {
                console.error('Signup error:', error.message);
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Sign Up</h2>
            <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default SignupForm;
