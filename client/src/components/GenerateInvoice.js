import React, { useState } from "react";

function GenerateInvoice() {

  const [transactionsData, setTransactionsData] = useState([
    { id: "", amount: "", country: "", currency: "", tax: "", invoiceNum: "" },
  ]); // State to store the list of names

  const addTransactionInput = () => {
    setTransactionsData([
      ...transactionsData,
      { id: "", amount: "", country: "", currency: "", tax: "" },
    ]);
  };

  const handleChange = (index, event) => {
    const newTransactionData = [...transactionsData];
    newTransactionData[index][event.target.name] = event.target.value;
    setTransactionsData(newTransactionData);
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

  const billers = [];

  const customers = [];

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
      newTransactionData[index].tax = taxAmount.toFixed(2); // Round to 2 decimal places
      setTransactionsData(newTransactionData);
    }
  };

  return (
    <div id="123">
      {
        <div>
          <h1> Hello Client Ji </h1>
          <body>
            <h2> Generate Invoice </h2>
            <form id="generateInvoice">
              <label for="billerId">BillerId: </label>
              <select id="billerId" billerId="billerId">
                <option value="Biller#1">Biller#1</option>
                <option value="Biller#2">Biller#2</option>
              </select>
              <br></br>
              <br></br>

              <label for="customerId">CustomerId: </label>
              <select id="customerId" customerId="customerId">
                <option value="Customer#1">Customer#1</option>
                <option value="Customer#2">Customer#2</option>
              </select>
              <br></br>
              <br></br>
              <h4>Add Transactions</h4>
            </form>
          </body>
        </div>
      }

      <div>
        <body>
          <form id="myForm" class="hidden" onSubmit={handleSubmit}>
            {transactionsData.map((transaction, index) => (
              <div>
                <br></br>
                <input
                  type="text"
                  name="id"
                  placeholder="Transaction Id"
                  value={transaction.id}
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
                  name="currency"
                  value={transaction.currency}
                  onChange={(event) => handleChange(index, event)}
                >
                  <option value="">Currency</option>
                  {currencies.map((currency, i) => (
                    <option key={i} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>{" "}
                <br></br>
                <input
                  type="text"
                  name="tax"
                  placeholder="Tax"
                  value={transaction.tax}
                  readOnly // User cannot edit tax field
                />
                <button type="button" onClick={() => calculateTax(index)}>
                  Calculate Tax
                </button>
              </div>
            ))}
            <br></br>
            <button type="button" onClick={addTransactionInput}>
              +
            </button>
            <br></br>
            <br></br>
            <br></br>

            <button type="submit">Submit</button>
          </form>
        </body>
      </div>
    </div>
  );
}

export default GenerateInvoice;
