import React, { useState } from "react";
import { Radio } from "antd";
let dataArr = [];

function BudgetInput(props) {
  //state to control the radio button value
  const [timeValue, setTimeValue] = useState("daily");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAdded, setExpenseAdded] = useState(false);
  /* */
  const [expenseAmount, setExpenseAmount] = useState("");
  /*I figured it isn't always that you use useState, sometimes you 
can just use conventional normal javaScript methods to do stuff. */

  // const [compiledData, setCompiledData] = useState([])
  // const [testVariable, setTestVariable] = useState(true)
  function appendExpenseToArr() {
    dataArr.push({
      expense_name: expenseName,
      expense_amount: expenseAmount,
      expense_time: timeValue
    });
    console.log(dataArr);
    setExpenseAdded(true);
    //expense added state variable helps us display a message to let the user know
    // his expense has been added

    //after two seconds setExpense added to false so it dissapears after a few seconds
    setTimeout(() => {
      setExpenseAdded(false);
    }, 5000);

    //we clear the expense field right after
    setExpenseName("");
    setExpenseAmount("");
    setTimeValue("daily");
  }

  //onClicking the add Expense button, we want to add the object to compiledData
  function handleMonthlyIncome(event) {
    setMonthlyIncome(event.target.value);
  }
  function handleExpenseName(event) {
    setExpenseName(event.target.value);
  }
  function handleExpenseAmount(event) {
    setExpenseAmount(event.target.value);
  }
  function handleRadioChange(event) {
    // console.log("radio checked", event.target.value);
    setTimeValue(event.target.value);
  }
  // function handleAddingExpense(event) {
  //     //its better to always return a new array than to use Array.push
  //     setCompiledData(current =>{
  //       return [...current,{
  //         expense_name : expenseName,
  //         expense_amount: expenseAmount,
  //         tiime_value: timeValue
  //         }]
  //     })
  //     console.log(compiledData)
  //     console.log("add expense button was clicked")

  //     setTestVariable(false)
  //     console.log("test variable state has been changed")
  //     console.log(testVariable)
  // }

  return (
    <div className="col-4">
      <form>
        <legend>Budget Validator form</legend>
        <div className="form-group">
          <label htmlFor="income" className="col-sm-2 col-form-label">
            Income
          </label>
          <input
            id="income"
            name="monthlyIncome"
            className="form-control"
            type="number"
            placeholder="Enter your monthly income here"
            value={monthlyIncome}
            onChange={handleMonthlyIncome}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense-name" className="col-sm-2 col-form-label">
            Expense
          </label>
          <input
            id="expense-name"
            className="form-control"
            type="text"
            name="expenseName"
            placeholder="Enter the name of your expense"
            value={expenseName}
            onChange={handleExpenseName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense-amount" className="col-sm-2 col-form-label">
            Amount
          </label>
          <input
            id="expense-amount"
            className="form-control"
            type="number"
            name="expenseAmount"
            placeholder="Enter your expense amount"
            value={expenseAmount}
            onChange={handleExpenseAmount}
          />
          {/*this should be where our radio button should go */}
          <Radio.Group onChange={handleRadioChange} value={timeValue}>
            <Radio value={"daily"} style={{ color: "white" }}>
              daily
            </Radio>
            <Radio value={"weekly"} style={{ color: "white" }}>
              weekly
            </Radio>
            <Radio value={"monthly"} style={{ color: "white" }}>
              monthly
            </Radio>
          </Radio.Group>
          {expenseAdded ? (
            <div className="alert alert-dismissible alert-success m-3">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>
                Expense Added successfully!! You can add more expenses in the
                input fields above
              </strong>
            </div>
          ) : null}
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => {
              appendExpenseToArr();
              //after adding expense to arr, we pass it to the parent
              props.onExpenseAdded(dataArr);
            }}
          >
            {/* */}
            Add expense
          </button>
        </div>
        <button
          type="button"
          className="btn btn-success mt-4"
          onClick={(event) => {
            event.preventDefault();
            props.onGetExpenseInfo(monthlyIncome, dataArr);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BudgetInput;

/*
 *don't put a submit listener on a button whose type hasn't been declared as submit
 **submit event listeners should be placed on forms
 **
 */
/*
When add expense button is clicked, I have to render a positive
reinforcement div that notifies that user that his expense has been added.
This div should be green and should dissappear after 3 seconds
It should also contain the message that user can add more expenses.

When the submit button is clicked, I have to do the following, 
prevent default, 
send the dataArray along with the income to the parent component where the calculations will take place 
*/
