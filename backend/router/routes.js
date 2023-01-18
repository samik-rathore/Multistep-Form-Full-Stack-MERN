const express = require('express');
const router = express.Router();

require('../db/conn');
const FormData = require("../model/formDataSchema");

router.get('/', (req, res) =>{
    res.send(`hello`);
});

router.post('/submit', async (req, res) =>{
    //const { product_name, price, orderID, date, name, number, email, address, payment_details} = req.body
    try{
        const data = new FormData(req.body);
        await data.save();
        res.status(201).json({message:"user registered successfully"});    

    } catch(err) {
        console.log(err);
    }
    
    
})
module.exports = router;