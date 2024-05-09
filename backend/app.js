const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());

app.use(require('./router/routes'));


app.listen(5000, () => {
    console.log(`server is running at port 5000`);
});