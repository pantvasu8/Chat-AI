import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SideBar.css';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/chat-ai">ChatAI</Link>
            <Link to="/request">Requests</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
};

export default Sidebar;
