const express = require("express");
const cors = require("cors");
const { instagram } = require("@jerrycoder/instagram-api");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Instagram API is Live!"
  });
});

app.get("/api/instagram", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({
        status: "error",
        message: "Instagram URL is required"
      });
    }

    const data = await instagram(url);

    return res.status(200).json({
      status: "success",
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

module.exports = app;
