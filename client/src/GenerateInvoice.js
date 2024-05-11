import React, { useState } from "react";
import axios from 'axios';
import {  useEffect } from "react";
import './GenerateInvoice.css'; // Importing CSS

const GenerateInvoice = (props) => {

  const [transactionsData, setTransactionsData] = useState([
  ]); // State to store the list of names

  
  const handleChange = (index, event) => {
    const newTransactionData = [...transactionsData];
    newTransactionData[index][event.target.name] = event.target.value;
    setTransactionsData(newTransactionData);
    console.log(transactionsData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted for invoice generation: ", transactionsData);
    // Add your logic to handle form submission here
  };

  const [showDynamicForm, setShowDynamicForm] = useState(false);
  const handlechange = (e) => {
    setShowDynamicForm(!showDynamicForm);
  };



  const countries = [
    "USA",
    "Ireland",
    "Japan",
    "China",
    "India",
    "Australia",
    // Add more countries as needed
  ];

  const currencies = [
    "USD",
    "EURO",
    "YEN",
    "YUAN",
    "INR",
    "AUD",
    // Add more countries as needed
  ];

  // Function to calculate tax
  const calculateTax = (index) => {
    const newTransactionData = [...transactionsData];
    const amount = parseFloat(newTransactionData[index].amount);
    if (!isNaN(amount)) {
      const taxAmount = amount * 0.1; // 10% tax
      newTransactionData[index].taxAmount = taxAmount.toFixed(2); // Round to 2 decimal places
      setTransactionsData(newTransactionData);
      console.log(transactionsData);
    }
  };

  const [billers, setBillers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [billerId, setBillerId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [invoiceNum, setInvoiceNum] = useState("");
  useEffect(()=>{
    setInvoiceNum(Math.ceil(Math.random()*45678345678).toString());
    setBillerId(billerId);
    console.log(billerId);
    console.log("hello")
  },[billerId])

  useEffect(()=>{
    setBillerId(customerId);
    console.log(customerId);
    console.log("hello2")
  },[customerId])

  const addTransactionInput = () => {

        setTransactionsData([
            ...transactionsData,
            {billerId:null,customerId:null, transactionId: "", amount: "", country: "", currencyCode: "", taxAmount: "", invoiceNumber: invoiceNum},
          ]);
          console.log(transactionsData);
    }


    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
    
  const postTransaction = () => {
    transactionsData.forEach((transaction) => {
        console.log(transaction);
        axios.post('http://localhost:5000/transactions', {
        "clientId": "AMZN",
        "billerId": billerId,
        "customerId": customerId,
        "transactionId": transaction.transactionId,
        "amount": transaction.amount,
        "country": transaction.country,
        "currencyCode": transaction.currencyCode,
        "taxAmount": transaction.taxAmount,
        "invoiceNumber": invoiceNum
    }, config)    
    });
  }

  const postInvoice = () => {
    let netAmount = 0;
    let netTax = 0;
    let transactionIdList = [];
    transactionsData.forEach((transaction, index) => {
        netAmount += parseFloat(transaction.amount);
        netTax += parseFloat(transaction.taxAmount);
        transactionIdList.push(transaction.transactionId);
    });

    axios.post('http://localhost:5000/invoice', {
        "clientId": "AMZN",
        "billerId": billerId,
        "customerId": customerId,
        "invoiceNumber": transactionsData[0].invoiceNumber,
        "currencyCode": transactionsData[0].currencyCode,
        "amount": netAmount,
        "country": transactionsData[0].country,
        "taxAmount": netTax,
        "transactionIdList": transactionIdList
    }, config)    
    
  }


  useEffect(()=>{
    (async () => {
    await axios.get('http://localhost:5000/billers', config)
      .then(response => {
        setBillers(response.data.billers);
      })
      .catch(error => {
        console.error(error);
      });

    await axios.get('http://localhost:5000/customers', config)
      .then(response => {
        setCustomers(response.data.customers);
      })
      .catch(error => {
        console.error(error);
      });
    })();
  },[])

  



  return (

    <div>
    <div>
      
        <div className="login-form">
          
            <div className="form-group">
            <form id="Form1">
              <label for="billerId">BillerId: </label>
              <select id="billerId" billerId="billerId" onChange={(e)=>setBillerId(e.target.value)}>
                {billers.map((biller) => (
                    <option onClick={()=>{setBillerId(biller.billerId)}} value={biller.billerId}>{biller.billerId}</option>
                ))}
              </select>
              <br></br>
              <br></br>

              <label for="customerId">CustomerId: </label>
              <select id="customerId" customerId="customerId" onChange={(e)=>setCustomerId(e.target.value)}>
              {customers.map((customer) => (
                    <option onClick={()=>{setCustomerId(customer.customerId)}} value={customer.customerId}>{customer.customerId}</option>
                ))}
              </select>
              <br></br>
              <br></br>
              <div class="center">
                <h4>TRANSACTIONS</h4>
              </div>
             
            </form>

            </div>
        
      

      
        <div className="form-group"> 
          <form id="Form2" class="hidden" onSubmit={handleSubmit}>
            {transactionsData.map((transaction, index) => (
              <div>
                <br></br>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Transaction Id"
                  value={transaction.transactionId}
                  onChange={(event) => handleChange(index, event)}
                />
                <br></br>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={transaction.amount}
                  onChange={(event) => handleChange(index, event)}
                />
                <br></br>
                <select
                  name="country"
                  value={transaction.country}
                  onChange={(event) => handleChange(index, event)}
                >
                  <option value="">Country</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </select>{" "}
                <br></br>
                <select
                  name="currencyCode"
                  value={transaction.currencyCode}
                  onChange={(event) => handleChange(index, event)}
                >
                  <option value="">Currency</option>
                  {currencies.map((currencyCode, i) => (
                    <option key={i} value={currencyCode}>
                      {currencyCode}
                    </option>
                  ))}
                </select>{" "}
                <br></br>
                <input
                  type="text"
                  name="tax"
                  placeholder="Tax"
                  value={transaction.taxAmount}
                  readOnly // User cannot edit tax field
                />
                <button type="button" className="login-button" onClick={() => calculateTax(index)}>
                  Calculate Tax
                </button>
              </div>
            ))}
            <br></br>
            <button type="button" className="login-button"
             onClick={() => {addTransactionInput()}} >
                +
            </button>
            <br></br>
            <br></br>
            <br></br>

            <button type="submit" className="login-button" onClick={(e) => {postTransaction() ; postInvoice(); props.handleGenerateInvoicePage(false); props.handleNewOnboardingPage(true)}}>
            Submit 
            </button>
            
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GenerateInvoice;