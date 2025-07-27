const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const TARGET_API = 'https://pamiecai.pl/api/proxy.php?api_key=WZ0c_6M+';

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(TARGET_API, req.body, {
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
