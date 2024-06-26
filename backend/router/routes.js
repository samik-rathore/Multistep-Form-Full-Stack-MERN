const express = require('express');
const router = express.Router();

require('../db/conn');
const { BillerData, CustomerData, TransactionData, InvoiceData } = require("../model/formDataSchema");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const P = require('bluebird');
const pdfAsync = P.promisifyAll(pdf);
const fsAsync = P.promisifyAll(fs);
const PDFDocument = require("pdfkit-table");
const _ = require('lodash');


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
        res.status(200).json({
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
        const customers = await CustomerData.find({});
        res.status(200).json({
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

router.post('/transactions', async (req, res) => {
    try {
        const data = new TransactionData(req.body);
        await data.save();
        res.status(201).json({
            message: "Transaction posted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Failure in posting transaction"
        });
    }
});

router.get('/transactions/:transactionId', async (req, res) => {
    try {
        const transactions = await TransactionData.find({transactionId: req.params.transactionId});
        res.status(200).json({
            transaction: transactions[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Failure in fetching transaction"
        });
    }
});

router.post('/invoice', async (req, res) => {
    try {
        const invoiceData = new InvoiceData(req.body);
        invoiceData.save();
        res.status(201).json({
            message: "Invoice Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error, 
            message: "Failure in invoice generation"
        });
    }
});

router.get('/invoice/:invoiceNumber', async (req, res) => {
    try {
        const invoiceData = await InvoiceData.find({invoiceNumber: req.params.invoiceNumber});
        const transactions = await TransactionData.find({transactionId: {$in: invoiceData[0].transactionIdList}});
        console.log(transactions);
        console.log(invoiceData);
        res.status(200).json({
            invoiceInfo: invoiceData[0],
            transactions
        });
    } catch (error) {
        res.status(500).json({
            error, 
            message: `Failure in fetching invoice ${req.params.invoiceNumber}`
        });
    }
});

router.get('/invoices', async (req, res) => {
    try {
        const invoices = await InvoiceData.find({});
        res.status(200).json({
            invoices
        });
    } catch (error) {
        res.status(500).json({
            error, 
            message: "Failure in fetching invoices"
        });
    }
});

router.post('/invoice/:invoiceNumber/transactions', async (req, res) => {
    try {
        const transactionData = new TransactionData(req.body);
        await transactionData.save();

        await InvoiceData.findOneAndUpdate({invoiceNumber: req.params.invoiceNumber}, {$push: {transactionIdList: req.body.transactionId}});

        res.status(201).json({
            message: "Transaction added in the invoice"
        });

    } catch (error) {
        res.status(500).json({
            error, 
            message: "Failure in adding transaction to the invoice"
        })
    }
})

router.get('/invoice/:invoiceNumber/transactions', async (req, res) => {
    try {
        const invoiceData = await InvoiceData.find({invoiceNumber: req.params.invoiceNumber});
        const transactions = await TransactionData.find({transactionId: {$in: invoiceData[0].transactionIdList}});

        const invoice = {invoiceData, transactions};
        res.status(200).json(invoice);
    } catch (error) {
        console.log("transaction fetch failure", error);
        res.status(500).json({
            error,
            message: "Failure in fetching invoice transactions"
        });
    }
});

router.get('/invoice/:invoiceNumber/generate', async (req, res) => {
    
    try {
        const [invoiceData] = await InvoiceData.find({invoiceNumber: req.params.invoiceNumber});
        const transactions = await TransactionData.find({transactionId: {$in: invoiceData.transactionIdList}});
    
        console.log(invoiceData, transactions);
    
        // init document
        let doc = new PDFDocument({ margin: 30, size: 'A4' });
        // save document
        doc.pipe(fs.createWriteStream("./document.pdf"));
  
        doc
            .text(`InvoiceNumber: ${invoiceData.invoiceNumber}`)
            .font('Times-Roman', 13)
            .moveDown()
            .text(`BillerId: ${invoiceData.billerId}`)
            .font('Times-Roman', 13)
            .moveDown()
            .text(`CustomerId: ${invoiceData.customerId}`)
            .font('Times-Roman', 13)
            .moveDown()
            .text(`Amount: ${invoiceData.amount}`)
            .font('Times-Roman', 13)
            .moveDown()
            .text(`InvoiceCurrency: ${invoiceData.currencyCode}`)
            .font('Times-Roman', 13)
            .moveDown()
        const transactionRowData = _.map(transactions, (e) => {
            return [e.transactionId, e.amount, e.taxAmount, e.currencyCode];
        });
        console.log("TT", transactionRowData);

        ;(async function createTable(){
            // table
            const table = { 
                title: 'Line Items',
                headers: ['Transaction', 'Amount', 'Tax', 'CurrencyCode'],
                rows: transactionRowData,
            };

            // the magic (async/await)
            await doc.table(table, { /* options */ });
        
            doc.end();
        })();
        
        doc.pipe(res);
    
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err, 
            message: "Unable to generate invoice pdf"
        });
    }
});

module.exports = router;