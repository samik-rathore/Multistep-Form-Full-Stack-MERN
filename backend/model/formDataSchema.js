const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: String,
        required: true
    }
})

const FormData = mongoose.model('FORM-DATA',formDataSchema);

module.exports = FormData;