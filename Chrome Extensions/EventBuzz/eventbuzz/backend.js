const PORT = 8000; 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


// Listen for changes on port
const app = express();


app.use(cors())
app.get('/', (request, response) => {
    response.json('hi');
})

app.get('/events', (req, res) => {
    const options = {
        method: 'get',
        url: 'https://events-api-kappa.vercel.app/',
      };
      axios.request(options).then((response) => {
        res.json(response.data)
      }).catch((error) => {
        console.log(error);
      })
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
