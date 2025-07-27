const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Nie doklejamy klucza do URL
const TARGET_API = 'https://pamiecai.pl/api/proxy.php';

app.post('/proxy', async (req, res) => {
  try {
    // Upewniamy się, że zawsze dodajemy poprawny klucz API w body
    const proxyRequest = {
      ...req.body,
      apiKey: 'WZ0c_6M+'
    };

    const response = await axios.post(TARGET_API, proxyRequest, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Błąd proxy:', error.toJSON ? error.toJSON() : error);
    res.status(500).json({
      error: true,
      message: error.message,
      response: error.response?.data || null
    });
  }
});

app.listen(port, () => {
  console.log(`Nomad Proxy listening on port ${port}`);
});
