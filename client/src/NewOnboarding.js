import { useState, useEffect } from "react";
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import "./NewOnboarding.css";
import BillerOnboarding from './BillerOnboarding';

function  NewOnboarding() {
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
  const [showBillerOnboardingPage, setShowBillerOnboardingPage] = useState(false);
  const handleBillerOnboardingPage = () => {
    setShowBillerOnboardingPage(!setShowBillerOnboardingPage)
  }

  return (

    <div className="container">
      {showBillerOnboardingPage && <BillerOnboarding/>}
      {!showBillerOnboardingPage && <form onSubmit={handleSubmit}>
        <h1>New Onboarding</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Billers</label>
            <select value={selectedBiller} onChange={handleBillerChange}>
              <option value="">Select Biller</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
              <option value="grape">Grape</option>
            </select>
          </div>
          <div className="field">
            <label>Customers</label>
            <select value={selectedCustomer} onChange={handleCustomerChange}>
              <option value="">Select Customer</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
              <option value="grape">Grape</option>
            </select>
          </div>
          
            <button className="fluid ui button blue" onClick={()=> {setShowBillerOnboardingPage(true)}}>Onboard Biller</button>
      
          <br/>
          <button className="fluid ui button blue">Onboard Customer</button>
        </div>
      </form>}
    </div>
  );
}

export default NewOnboarding;
