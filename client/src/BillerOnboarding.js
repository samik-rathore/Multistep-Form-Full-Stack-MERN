import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import "./BillerOnboarding.css";
import axios from 'axios';

const App = (props) => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    axios.post('http://localhost:5000/billers',{
        "billerId": formValues.billerId,
        "clientId": "client",
        "invoiceSequence" : formValues.invNo,
        "payeeId": formValues.payId,
        "payeeGroup": formValues.payGrp
    },config)
  };


  return (
    <div className="container">

      <form>
        <h1>Biller Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>BillerId</label>
            <input
              type="text"
              name="billerId"
              placeholder="BillerId"
              value={formValues.billerId}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Invoice Sequence Number</label>
            <input
              type="text"
              name="invNo"
              placeholder="InvNo"
              value={formValues.invNo}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Payee Id</label>
            <input
              type="text"
              name="payId"
              placeholder="PayId"
              value={formValues.payId}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Payee Group</label>
            <input
              type="text"
              name="payGrp"
              placeholder="PayGrp"
              value={formValues.payGrp}
              onChange={handleChange}
            />
          </div>
            
          <button className="fluid ui button blue" onClick={(e)=>{handleSubmit(e);props.handleBillerOnboardingPage(false);props.handleNewOnboardingPage(true)}}>Submit</button>
          
        </div>
      </form>
    </div>
  );
}

export default App;
