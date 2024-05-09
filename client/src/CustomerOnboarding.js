import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import "./CustomerOnboarding.css";
import axios from 'axios';

function CustomerOnboarding() {
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

  const handleSubmit1 = async(e) => {
    console.log("meow");
    e.preventDefault();
    setIsSubmit(true);
    await axios.post('http://localhost:5000/customers',{
        "clientId": "client",
        "customerId": formValues.customerId,
        "payTerm" : formValues.payTerm
    }, config)
  };


  return (
    <div className="container">

      <form>
        <h1>Customer Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>CustomerId</label>
            <input
              type="text"
              name="customerId"
              placeholder="Customer Id"
              value={formValues.customerId}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Pay Term</label>
            <input
              type="text"
              name="payTerm"
              placeholder="payTerm"
              value={formValues.payTerm}
              onChange={handleChange}
            />
          </div>
          
            
          <button type="button" className="fluid ui button blue" onClick={(e)=>{handleSubmit1(e)}}>Submit</button>
          
        </div>
      </form>
    </div>
  );
}

export default CustomerOnboarding;
