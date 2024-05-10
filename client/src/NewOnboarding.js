import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import "./NewOnboarding.css";
import BillerOnboarding from './BillerOnboarding';
import CustomerOnboarding from './CustomerOnboarding';
import GenerateInvoice from "./components/GenerateInvoice";
import axios from 'axios';

function  NewOnboarding() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [billers, setBillers] = useState([]);
  const [customers, setCustomers] = useState([]);

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
  useEffect(async()=>{
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
  },[])


  const [showBillerOnboardingPage, setShowBillerOnboardingPage] = useState(false);
  const handleBillerOnboardingPage = () => {
    setShowBillerOnboardingPage(!setShowBillerOnboardingPage)
  }

  const [showCustomerOnboardingPage, setShowCustomerOnboardingPage] = useState(false);
  const handleCustomerOnboardingPage = () => {
    setShowCustomerOnboardingPage(!setShowCustomerOnboardingPage)
  }

  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);
  const handleGenerateInvoicePage = (showpage) =>{
    setShowGenerateInvoice(showpage)
  }

  return (

    <div className="container">
      {showGenerateInvoice && <GenerateInvoice handleGenerateInvoicePage={handleGenerateInvoicePage}/>}
      {showBillerOnboardingPage && <BillerOnboarding/>}
      {showCustomerOnboardingPage && <CustomerOnboarding/>}
      {!showBillerOnboardingPage  && !showCustomerOnboardingPage && <form onSubmit={handleSubmit}>
        <h1>New Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Billers</label>
            {console.log(billers)}
            {billers.map((biller)=>{
              return(
                <li>{biller.billerId}</li>
              )
              
            })}
          </div>
          <div className="field">
            <label>Customers</label>
            {customers.map((customer)=>{
              return(
                <li>{customer.customerId}</li>
              )
              
            })}
          </div>
          
            <button className="fluid ui button blue" onClick={()=> {setShowBillerOnboardingPage(true)}}>Onboard Biller</button>
      
          <br/>
          <button className="fluid ui button blue" onClick={()=> {setShowGenerateInvoice(true)}}>Generate Invoice</button>
          <br/>
          <button className="fluid ui button blue" onClick={()=> {setShowCustomerOnboardingPage(true)}}>Onboard Customer</button>
        </div>
      </form>}
    </div>
  );
}

export default NewOnboarding;
