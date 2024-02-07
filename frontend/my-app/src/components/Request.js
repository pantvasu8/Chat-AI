import React, { useState, useEffect } from 'react';
import api from '../utils/api'; // Import your API utility
import '../css/Request.css'; // Import your CSS file

const Request = () => {
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    const [logs, setLogs] = useState([]);
    const [defaultLogs, setDefaultLogs] = useState([]); // State for storing default logs
    const username = localStorage.getItem('username');

    useEffect(() => {
        // Fetch default logs on component mount
        fetchDefaultLogs();
    }, []); // Empty dependency array to run only once on mount

    const fetchDefaultLogs = async () => {
        try {
            const res = await api.filterLogs({
                username,
            });
            setDefaultLogs(res.data);
            setLogs(res.data);
        } catch (error) {
            console.error('Error fetching default logs:', error);
            // Handle error if needed
        }
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleFilterLogs = async () => {
        try {

            startDate = startDate ? `${startDate} 00:00:00` : '';
            endDate = endDate ? `${endDate} 23:59:59` : '';

            console.log('Filter logs parameters:', {
                username,
                model,
                status,
                startDate,
                endDate,
            });

            const response = await api.filterLogs({
                username,
                model,
                status,
                startDate,
                endDate,
            });
            console.log('Response from api is:', response.data);
            setLogs(response.data);

        } catch (error) {
            console.error('Error fetching filtered logs:', error);
            // Handle error if needed
        }
    };

    const handleClearAll = () => {
        setModel('');
        setStatus('');
        setStartDate('');
        setEndDate('');
        setLogs(defaultLogs); // Reset logs to default
    };

    return (
        <div className="request-container">
            <div className="filter-section">
                <label htmlFor="modelSelect">Model:</label>
                <select id="modelSelect" value={model} onChange={handleModelChange}>
                    <option value="">All Models</option>
                    <option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option>
                    <option value="gpt-3.5-turbo-instruct-0914">gpt-3.5-turbo-instruct-0914</option>
                    <option value="babbage-002">babbage-002</option>
                    <option value="davinci-002">davinci-002</option>
                </select>

                <label htmlFor="statusSelect">Status:</label>
                <select id="statusSelect" value={status} onChange={handleStatusChange}>
                    <option value="">All Status</option>
                    <option value="success">Success</option>
                    <option value="failure">Failure</option>
                </select>

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />

                <div class="div-button">
                    <button class="button" onClick={handleFilterLogs}>Filter</button>
                    <button class="button" onClick={handleClearAll}>Clear All</button>
                </div>
            </div>

            <table className="logs-table">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                        <th>Request</th>
                        <th>Response</th>
                        <th>Total Tokens</th>
                        <th>Prompt Tokens</th>
                        <th>Completion Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.model}</td>
                            <td>{log.status}</td>
                            <td>{log.timestamp}</td>
                            <td>{log.request}</td>
                            <td>{log.response}</td>
                            <td>{log.totalTokens}</td>
                            <td>{log.promptTokens}</td>
                            <td>{log.completionTokens}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Request;
