import React, { useState } from "react";
import BudgetInput from "./Budget_input";

function BudgetApp() {
  const [expenseData, setExpenseData] = useState([]);
  const [userIncome, setUserIncome] = useState([]);
  const [SavableAmount, setSavableAmount] = useState("");
  const [message, setMessage] = useState("");
  const [totalCosts, setTotalCosts] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [exceededAmount, setExceededAmount] = useState("");
  function getChildArr(dataArray) {
    //I need to loop through the dataArr so that
    //the user can see all the expenses he keeps on adding
    setExpenseData([...dataArray]);
  }
  function getDatafromChild(userIncome, expenseData) {
    //user income represents the user's monthly income
    //expense data is an array containing objects which have data about the user's expenses
    let monthlyCost = 0;
    expenseData.forEach((expense) => {
      if (expense.expense_time === "daily") {
        monthlyCost = monthlyCost + expense.expense_amount * 30;
      } else if (expense.expense_time === "weekly") {
        monthlyCost = monthlyCost + expense.expense_amount * 4;
      } else if (expense.expense_time === "monthly") {
        monthlyCost = monthlyCost + expense.expense_amount;
      }
    });
    //variable to store the amount capable of being saved
    console.log(monthlyCost);
    setTotalCosts(monthlyCost);
    if (userIncome > monthlyCost) {
      const savable = userIncome - monthlyCost;
      setSavableAmount(savable);
      setMessage("Yes you can save some amount of money");
    } else {
      const exceededAmount = userIncome - monthlyCost;
      setExceededAmount(exceededAmount);
      setMessage(`with your current expenses and income, it is unfortunate
      that you won't be able to save any amount of money,
      You may need to adjust your saving goals`);
    }
    //variable to store the amount
    setUserIncome(userIncome);

    //after all calculations are complete show results
    setShowResults(true);
  }
  return (
    <div className="row justify-content-center">
      <BudgetInput
        onGetExpenseInfo={getDatafromChild}
        onExpenseAdded={getChildArr}
      />
      <div className="col-4">
        <div>
          <h4 className="text-success">
            The purpose of this budget validator webapp
          </h4>
          <p style={{ textAlign: "justify" }} className="text-primary">
            What this webapp does is that, it keeps track of how you normally
            spend your monthly income within a month,all your expenses and tells
            you if you might be able to save money and exactly how much you will
            be able to save
          </p>
        </div>
        <div>
          {/*this is where all the output will be displayed */}
          {expenseData.length !== 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Expense Name</th>
                  <th scope="col">Expense Amount</th>
                  <th scope="col">time frame for epense</th>
                </tr>
              </thead>
              <tbody>
                {expenseData.map((value, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{value.expense_name}</td>
                      <td>{value.expense_amount}</td>
                      <td>{value.expense_time}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
        {/*I want to show all these only after the submit button has been presses */}
        {showResults ? (
          <div>
            <h3>Summary of results</h3>
            {/*if the user's income is more than expenses display the following */}
            {message === "Yes you can save some amount of money" ? (
              <div>
                <div className="alert alert-dismissible alert-success">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>{message}</strong>.
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your monthly income :
                    </label>
                    <input
                      className="form-control"
                      id="disabledInput"
                      type="text"
                      value={userIncome}
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your total costs from all expenses:
                    </label>
                    <input
                      className="form-control"
                      id="disabledInput"
                      type="text"
                      value={totalCosts}
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your savable Amount :
                    </label>
                    <input
                      className="form-control"
                      id="disabledInput"
                      type="text"
                      value={SavableAmount}
                      disabled
                    />
                  </fieldset>
                </div>
              </div>
            ) : (
              <div>
                <div class="alert alert-dismissible alert-warning">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                  ></button>
                  <h4 className="alert-heading mb-0">{message}</h4>
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your monthly income :
                    </label>
                    <input
                      className="form-control"
                      id="disabledInput"
                      type="text"
                      value={userIncome}
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your total costs from all expenses:
                    </label>
                    <input
                      className="form-control"
                      id="disabledInput"
                      type="text"
                      value={totalCosts}
                      disabled
                    />
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="form-label" htmlfor="disabledInput">
                      Your exceeded amount :
                    </label>
                    <input
                      class="form-control"
                      id="disabledInput"
                      type="text"
                      value={exceededAmount}
                      disabled
                    />
                  </fieldset>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BudgetApp;

//define some functions and passs them as props

/*
    {
      expense_name: "clothing",
      expense_amount: 45,s
      expense_time: "daily"
    } 
    
  if the person's expenses are even way more than his income, I need to
  **show the userIncome
  **show the totalCost 
   **show the message so the user knows he can't save any money
  **show the amount in debt, so the user can adjust his expenses

  if the person's expenses are suitable 
  **show the message so the user knows that he can save money
  **show the userIncome
  **show the totalCost
  **savable amount
    
    */

/*
    I want a feature to be added to my budget app, if the expenses 
    exceed the user's monthly income, I want to display 
    to the user the largest contributng expense and by exactly how much he can adjust
    his expenses. */
