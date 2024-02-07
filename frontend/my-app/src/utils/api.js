import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000' || process.env.REACT_APP_BACKEND_URL
});

const api = {
    userSignup: async (userData) => {
        return instance.post('/signup', userData);
    },
    userLogin: async (userData) => {
        return instance.post('/login', userData);
    },
    getResponse: async (inputData) => {
        return instance.post('/openai/getCompletionResponse', inputData);
    },
    filterLogs: async (inputData) => {
        return instance.post('/dashboard/filterLogs', inputData);
    },
    getStatusCount: async (inputData) => {
        return instance.post('/dashboard/getStatusCount', inputData);
    },
    getTotalTokens: async (inputData) => {
        return instance.post('/dashboard/getTotalInputOutputTokens', inputData);
    },
    getP95LatencyAndAvgLatency: async (inputData) => {
        return instance.post('/dashboard/getP95LatencyAndAvgLatency', inputData);
    },
    getRequestPerSecond: async (inputData) => {
        return instance.post('/dashboard/getRequestsPerSecond', inputData);
    },
    getLatencies: async (inputData) => {
        return instance.post('/dashboard/getLatencies', inputData);
    },

};

export default api;
