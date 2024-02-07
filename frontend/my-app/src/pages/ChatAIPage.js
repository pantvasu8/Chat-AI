import React from 'react';
import ChatAI from '../components/ChatAI';
import Sidebar from '../components/SideBar';
//import Layout from '../components/Layout';
const ChatAIPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content" style={{ flex: 1 }}>
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Chat with AI</h1>
                <ChatAI />
            </div>
        </div>
    );
};

export default ChatAIPage;