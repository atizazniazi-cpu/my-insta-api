const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/api/instagram', async (req, res) => {
  try {
    const instaUrl = req.query.url;
    const { data } = await axios.post('https://snapsave.app/action.php', 
      `url=${encodeURIComponent(instaUrl)}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const $ = cheerio.load(data);
    let links = [];
    $('a[href*="https://"]').each((i, el) => {
      let link = $(el).attr('href');
      if(link.includes('.mp4')) links.push(link);
    });
    res.json({ status: 'success', downloads: links });
  } catch (e) {
    res.json({ status: 'fail', error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is Live! Use /api/instagram?url=INSTA_LINK');
});
module.exports = app;
