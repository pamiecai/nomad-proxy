const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;
const TARGET_URL = process.env.TARGET_URL;

app.post('/proxy', async (req, res) => {
    const apiKey = req.query.api_key || req.headers['x-api-key'];
    if (apiKey !== API_KEY) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    try {
        const response = await axios.post(TARGET_URL, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Nomad Proxy listening on port ${port}`);
});