import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import "./NewOnboarding.css";
import BillerOnboarding from './BillerOnboarding';
import CustomerOnboarding from './CustomerOnboarding';
import GenerateInvoice from "./GenerateInvoice";
import axios from 'axios';

const  NewOnboarding = (props) => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [billers, setBillers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
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
      await axios.get('http://localhost:5000/invoices', config)
      .then(response => {
        console.log(response.data)
        setInvoices(response.data.invoices);
      })
      .catch(error => {
        console.error(error);
      });
    })();
  },[])

  
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);
  const handleGenerateInvoicePage = (show) => {
    setShowGenerateInvoice(show)
  }

  const [showBillerOnboardingPage, setShowBillerOnboardingPage] = useState(false);
  const handleBillerOnboardingPage = (show) => {
    setShowBillerOnboardingPage(show)
  }

  const [showCustomerOnboardingPage, setShowCustomerOnboardingPage] = useState(false);
  const handleCustomerOnboardingPage = (show) => {
    setShowCustomerOnboardingPage(show)
  }

  const [showNewOnboardingPage, setShowNewOnboarding] = useState(true);
  const handleNewOnboardingPage = (show) => {
    setShowNewOnboarding(show)
  }

  const fetchInvoiceData = async (invoiceNumber) => {
    try {
      // Define the URL with the invoice number parameter
      const url = `http://localhost:5000/invoice/${invoiceNumber}/generate`;

      // Make a GET request to the endpoint using Axios
      const response = await axios.get(url, {
          responseType: 'blob', // Expect the response as a binary blob
      });

      // Create a URL for the blob
      const urlBlob = URL.createObjectURL(response.data);

      // Create an anchor element and set the download attribute
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', `invoice_${invoiceNumber}.pdf`);

      // Append the link to the document body
      document.body.appendChild(link);

      // Programmatically trigger the download by simulating a click on the link
      link.click();

      // Clean up by removing the link from the document body
      document.body.removeChild(link);
      
      // Revoke the object URL to free memory
      URL.revokeObjectURL(urlBlob);
  } catch (error) {
      console.error('Failed to download PDF:', error);
      // Handle errors as needed (e.g., display a notification to the user)
  }
};

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
      setTimeout(async() => {
        await axios.get('http://localhost:5000/invoices', config)
      .then(response => {
        console.log(response.data)
        setInvoices(response.data.invoices);
      })
      .catch(error => {
        console.error(error);
      });
      }, 1000);
      
  })();
  },[showNewOnboardingPage])

  return (

    <div className="container2">
      {showBillerOnboardingPage && <BillerOnboarding handleBillerOnboardingPage={handleBillerOnboardingPage} handleNewOnboardingPage={handleNewOnboardingPage} />}
      {showCustomerOnboardingPage && <CustomerOnboarding handleCustomerOnboardingPage={handleCustomerOnboardingPage} handleNewOnboardingPage={handleNewOnboardingPage}/>}
      {showGenerateInvoice && <GenerateInvoice handleGenerateInvoicePage={handleGenerateInvoicePage} handleNewOnboardingPage={handleNewOnboardingPage}/>}
      {showNewOnboardingPage && <form onSubmit={handleSubmit}>
        <h1>New Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="biller-container">
              <h1 className="biller-title">List of Billers</h1>
              <ul className="biller-list">
                  {billers.map((biller, index) => (
                      <li key={index} className="biller-item">
                          <div className="biller-details">
                              <div className="biller-name">{biller.billerId}</div>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="biller-container">
              <h1 className="biller-title">List of Customers</h1>
              <ul className="biller-list">
                  {customers.map((customer, index) => (
                      <li key={index} className="biller-item">
                          <div className="biller-details">
                              <div className="biller-name">{customer.customerId}</div>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="field">
            <table>
            <div className="invoice-container">
            <h1 className="invoice-title">Invoices</h1>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Biller ID</th>
                        <th>Customer ID</th>
                        <th>Invoice Number</th>
                        <th>Currency Code</th>
                        <th>Amount</th>
                        <th>Tax Amount</th>
                    </tr>
                </thead>
                <tbody>
                {invoices.map((invoice, index) => (
                        <tr key={index}>
                            <td>{invoice.clientId}</td>
                            <td>{invoice.billerId}</td>
                            <td>{invoice.customerId}</td>
                            <a onClick={()=>fetchInvoiceData(invoice.invoiceNumber)}><td>{invoice.invoiceNumber}</td></a>
                            <td>{invoice.currencyCode}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.taxAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            </table>
          </div>
          
            <button className="fluid ui button blue" onClick={()=> {setShowBillerOnboardingPage(true);setShowNewOnboarding(false)}}>Onboard Biller</button>
      
          <br/>
          <button className="fluid ui button blue" onClick={()=> {setShowCustomerOnboardingPage(true);setShowNewOnboarding(false)}}>Onboard Customer</button>
          <br/>

         <button className="fluid ui button blue" onClick={()=> {setShowGenerateInvoice(true);setShowNewOnboarding(false)}}>Generate Invoice</button>

        </div>
      </form>}
    </div>
  );
}

export default NewOnboarding;
