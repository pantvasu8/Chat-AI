import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/SideBar';
import '../css/Dashboard.css'
const DashboardPage = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div className="content" style={{ flex: 1 }}>
                <h1 style={{ textAlign: 'center', marginTop: '10px' }}>Dashboard</h1>
                <Dashboard />
            </div>
        </div>
    );
};

export default DashboardPage;
