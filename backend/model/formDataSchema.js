const mongoose = require('mongoose');

const BillerDataSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    billerId: {
        type: String,
        required: true
    },
    invoiceSequence: {
        type: String,
        required: true
    },
    payeeId: {
        type: String,
        required: true
    },
    payeeGroup: {
        type: String,
        required: true
    }
})
const BillerData = mongoose.model('BillerData',BillerDataSchema);


const CustomerDataSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    payTerm: {
        type: String,
        required: true
    }
})
const CustomerData = mongoose.model('CustomerData',CustomerDataSchema);


const TransactionDataSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    billerId: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    currencyCode : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    taxAmount : {
        type: String,
        required: true
    }
})
const TransactionData = mongoose.model('TransactionData',TransactionDataSchema);


const InvoiceDataSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    billerId: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    currencyCode : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    taxAmount : {
        type: String,
        required: true
    }
})
const InvoiceData = mongoose.model('InvoiceData', InvoiceDataSchema);

module.exports = {
    BillerData,
    CustomerData,
    TransactionData,
    InvoiceData
};