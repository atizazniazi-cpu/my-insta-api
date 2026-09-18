const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is Live! Use /api/instagram?url=LINK');
});

app.get('/api/instagram', async (req, res) => {
  const instaUrl = req.query.url;
  if (!instaUrl) return res.status(400).json({ error: 'url missing' });

  try {
    // Cobalt API - sab se powerful downloader
    const response = await axios.post('https://api.cobalt.tools/api/json',
      { url: instaUrl },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
    );

    const data = response.data;

    // Cobalt kabhi direct url deta hai, kabhi picker
    let videoUrl = data.url || data.picker?.[0]?.url;

    if (!videoUrl) {
      return res.status(500).json({ error: 'Video not found from Cobalt', raw: data });
    }

    res.json({
      downloadUrl: videoUrl,
      videoUrl: videoUrl,
      status: 'success',
      raw: data
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed', details: err.response?.data || err.message });
  }
});

module.exports = app;
