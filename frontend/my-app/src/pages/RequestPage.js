import React from 'react';
import Request from '../components/Request';
import Sidebar from '../components/SideBar';
import '../css/Request.css';
const RequestPage = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div className="content" style={{ flex: 1 }}>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Requests</h1>
                <Request />
            </div>
        </div>
    );
};

export default RequestPage;
