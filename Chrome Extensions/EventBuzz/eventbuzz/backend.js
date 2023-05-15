const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


// Listen for changes on port
const app = express();

app.use(cors())

const { createServer } = require('vercel');
require('dotenv').config();

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.json('hi');
  } 
  else if (req.url === '/events') {
    const options = {
      method: 'get',
      url: 'https://events-api-kappa.vercel.app/api/events',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };
    fetch(options.url, {
      headers: options.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
});

server.listen();
console.log(`Server listening on ${option.url}`);

