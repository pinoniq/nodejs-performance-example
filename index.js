require('dotenv').config();

const express = require('express');
const app = express();

require('./src/routes')(app);

const port = process.env.port;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});