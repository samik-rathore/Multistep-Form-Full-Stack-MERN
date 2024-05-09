import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import "./BillerOnboarding.css";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };


  const [selectedBiller, setSelectedBiller] = useState('');

  const handleBillerChange = (e) => {
    setSelectedBiller(e.target.value);
  };

  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h1>Biller Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>BillerId</label>
            <input
              type="text"
              name="billerId"
              placeholder="BillerId"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Invoice Sequence Number</label>
            <input
              type="text"
              name="billerId"
              placeholder="InvNo"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Payee Id</label>
            <input
              type="text"
              name="billerId"
              placeholder="PayId"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
            
          <button className="fluid ui button blue">Onboard Biller</button>
          <br/>
          <button className="fluid ui button blue">Onboard Customer</button>
        </div>
      </form>
    </div>
  );
}

export default App;
