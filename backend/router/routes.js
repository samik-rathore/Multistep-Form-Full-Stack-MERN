const express = require('express');
const router = express.Router();

require('../db/conn');
const { BillerData, CustomerData, TransactionData, InvoiceData } = require("../model/formDataSchema");

router.get('/', (req, res) =>{
    res.send(`hello`);
});


router.post('/billers', async (req, res) => {
    try {
        console.log("biller req.body = ", req.body);
        const data = new BillerData(req.body);
        await data.save();
        res.status(201).json({
            message: "Biller created successfully"
        });    
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Unable to create biller"

        })
    }   
});

router.get('/billers', async (req, res) => {
    try {
        const billers = await BillerData.find({});
        res.status(201).json({
            message: "Biller created successfully",
            billers: billers
        });    

    } catch(error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Unable to fetch billers"
        })
    }   
});

router.post('/customers', async (req, res) => {
    try {
        console.log("customer req.body = ", req.body);
        const data = new CustomerData(req.body);
        await data.save();
        res.status(201).json({
            message: "Customer created successfully"
        });    
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Unable to create customer"
        })
    }   
});

router.get('/customers', async (req, res) => {
    try {
        const billers = await CustomerData.find({});
        res.status(201).json({
            message: "Customer created successfully",
            customers
        });    

    } catch(error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Unable to fetch customers"
        })
    }   
});


module.exports = router;