// components/gasStationMetrics.js
const fetch = require('node-fetch');

async function fetchGasStationMetrics() {
    const url = 'https://gasstation.polygon.technology/zkevm';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // If the server response was not ok, throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const metrics = await response.json(); // Parse the JSON from the response
        return metrics; // Return the parsed metrics
    } catch (error) {
        console.error('Failed to fetch gas station metrics:', error);
        throw error; // Rethrow the error so it can be caught by the caller
    }
}

module.exports = { fetchGasStationMetrics };
