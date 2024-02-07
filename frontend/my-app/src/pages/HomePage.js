import React from 'react';
import { Link } from 'react-router-dom';
import "../css/HomePage.css"

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="welcome-message">Hi! Welcome to Chat-AI</h1>
            <div className="button-container">
                <Link to="/login" className="home-button">
                    Login
                </Link>
                <Link to="/signup" className="home-button">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
