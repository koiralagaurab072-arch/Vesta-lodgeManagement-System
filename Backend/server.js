const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');


require('dotenv').config();

PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Lodge managemant System')
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})