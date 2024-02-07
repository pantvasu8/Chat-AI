import React, { useState, useEffect } from 'react';
import api from '../utils/api'; // Import your API utility
import { LineChart } from '@mui/x-charts/LineChart'; // Import the RequestsLineGraph component
import { PieChart } from '@mui/x-charts/PieChart';
import '../css/Dashboard.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const Dashboard = () => {
    const [statusData, setStatusData] = useState(null);
    const [tokensData, setTokensData] = useState(null);
    const [requestsData, setRequestsData] = useState(null);
    const [latencyData, setLatencyData] = useState(null);
    const [getLatencyData, setGetLatencyData] = useState(null);

    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statusResponse = await api.getStatusCount({ username });
            setStatusData(statusResponse.data);

            const tokensResponse = await api.getTotalTokens({ username });
            setTokensData(tokensResponse.data);

            const requestsResponse = await api.getRequestPerSecond({ username });
            setRequestsData(requestsResponse.data);

            const latencyResponse = await api.getP95LatencyAndAvgLatency({ username });
            setLatencyData(latencyResponse.data);

            const getLatencyResponse = await api.getLatencies({ username });
            setGetLatencyData(getLatencyResponse.data.Latency);


            console.log("output fron api:", getLatencyResponse.data.Latency);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const xLabels = [
        '5min',
        '30min',
        '1hour',
        '6hours',
        '1day',
        '2days'
    ];

    const chartData = {
        xAxis: [{ scaleType: 'point', data: xLabels }],
        series:
            [
                {
                    data: [
                        requestsData?.count_5min,
                        requestsData?.count_30min,
                        requestsData?.count_1hour,
                        requestsData?.count_6hours,
                        requestsData?.count_1day,
                        requestsData?.count_2days,
                    ], label: 'No. of request in last x time'
                },
            ]
    };
    return (
        <div className="dashboard-container">
            {/* Display Status Count and Latency */}
            {/* <div className="chart-wrapper"> */}
            <div className="line-chart">
                {requestsData && (
                    <LineChart
                        xAxis={chartData.xAxis}
                        series={chartData.series}
                        width={500}
                        height={300}
                    />
                )}
            </div>
            {/* </div> */}

            {/* <div className="chart-wrapper"> */}
            <div className="pie-chart">
                {statusData && (
                    <PieChart
                        series={[
                            { data: [{ id: 0, value: statusData.successCount, label: 'success' }, { id: 1, value: statusData.failureCount, label: 'failure' },], },
                        ]}
                        width={400}
                        height={200}
                    />
                )}
            </div>

            {/* </div> */}
            <div className="scatter-plot">
                {getLatencyData && (
                    <ScatterChart
                        width={600}
                        height={300}
                        series={[
                            {
                                label: 'Response latency in milliseconds',
                                data: getLatencyData.map((value, index) => ({ x: index, y: value })),
                            },
                        ]}
                    />
                )}
            </div>
            {/* <div className="chart-wrapper"> */}
            <div className="bar-chart">
                {latencyData && (
                    <BarChart
                        yAxis={[{ label: 'ms' }]}
                        xAxis={[{ scaleType: 'band', data: ['P95 of Latency', 'Average of Latency'] }]}
                        series={[{ data: [latencyData.p95Latency, 0] }, { data: [0, latencyData.avgLatency] }]}
                        width={500}
                        height={300}
                    />
                )}
            </div>
            {/* </div> */}

            {/* <div className="chart-wrapper"> */}
            <div className="pie-chart">
                {tokensData && (
                    <PieChart
                        series={[
                            { data: [{ id: 0, value: tokensData.totalInputTokens, label: 'Input Tokens' }, { id: 1, value: tokensData.totalOutputTokens, label: 'Output Tokens' },], },
                        ]}
                        width={400}
                        height={200}
                    />
                )}
            </div>
            {/* </div> */}


        </div >
    );
};

export default Dashboard;
