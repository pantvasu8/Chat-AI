import React, { useState } from 'react';
import api from '../utils/api'; // Adjust the import based on your API configuration
import '../css/ChatAI.css'; // Add your styling as needed

const ChatAI = () => {
    const [model, setModel] = useState('gpt-3.5-turbo-instruct');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleAsk = async () => {
        try {
            const username = localStorage.getItem('username');
            console.log('Filter logs parameters:', {
                username,
                model,
                prompt: input,
            });
            const response = await api.getResponse({ username, prompt: input, model });
            console.log('Response from API:', response.data.data);
            // Assuming your API returns data in a 'response' field
            setOutput(response.data.data);
            console.log('Output:', output);
            setError('');
            setInput('');
        } catch (error) {
            console.error('Error fetching response:', error);

            // Display a generic error message for simplicity
            setError('An error occurred while fetching the response. May be the model can not understand the kind of request you are sending or you might have exceeded the RPM limit of openai. Please try again later after 20 seconds.');
            setOutput('');
            setInput('');
        }
    };

    return (
        <div className="chat-ai-container">
            <div className="model-selector">
                <label htmlFor="modelSelect">Select Model:</label>
                <select id="modelSelect" value={model} onChange={handleModelChange}>
                    <option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option>
                    <option value="gpt-3.5-turbo-instruct-0914">gpt-3.5-turbo-instruct-0914</option>
                    <option value="babbage-002">babbage-002</option>
                    <option value="davinci-002">davinci-002</option>
                </select>
            </div>

            <div className="chat-inbox">
                <input
                    type="text"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button onClick={handleAsk}>Ask</button>
            </div>

            {output && <div className="chat-response">{output}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ChatAI;
