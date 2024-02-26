import express from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import getVersionInfo from "./components/extractVersions.js";
import { fetchGasStationMetrics } from "./components/gasStationMetrics.js";

const app = express();
const port = 3000;

// Endpoint to scrape historical data


app.get('/versions', async (req, res) => {
    console.log("YMG");
    const url = 'https://raw.githubusercontent.com/0xPolygonHermez/.github/master/profile/README.md';
    try {
        const versions = await getVersionInfo(url);
        res.json(versions);
    } catch (error) {
        res.status(500).send('Failed to fetch versions');
    }
});
app.get('/gas-station-metrics', async (req, res) => {
    try {
        const metrics = await fetchGasStationMetrics();
        res.json(metrics); // Send the metrics as a JSON response
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to fetch gas station metrics.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
