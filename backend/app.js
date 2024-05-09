const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
const { TransactionData, BillerData, InvoiceData, CustomerData } = require('./model/formDataSchema');

app.use(express.json());

app.use(require('./router/routes'));

app.listen(3000, () => {
    console.log(`server is running at port 3000`);
    console.log("TAAA", TransactionData);
})