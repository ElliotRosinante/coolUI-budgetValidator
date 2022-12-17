import BudgetApp from "./components/budget_app";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <BudgetApp />
    </div>
  );
}

/* this is another version of the app

I want to create a web app that you feed it with data 
about your income on a monthly basis, and then 
you feed it with data about your other expenditure(
  for example your food, airtime, transportation, other i.e(miscellaneous>))
  Then you feed it with information about an amount of money you want to save 
  Automatically what it does is that it subtracts your expenses from 
  your income and gives you an appropriate number of days that you can achieve
  this money goal and how much you should put down each day to reach your desired income
  
  
  ***this app is something I have decided to make for myself for my own good.*/
