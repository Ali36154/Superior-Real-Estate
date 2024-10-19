import React, { useState } from 'react';
import FormInput from './FormInput';
import { FaDollarSign } from 'react-icons/fa';
import './calculator';

function Form() {
  const [homevalue, setHomeValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState(0);
  const [interestAmount, setInterestAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState(1);
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  function calculateLoanAmount() {
    const calculatedLoanAmount = homevalue - downPayment;
    setLoanAmount(calculatedLoanAmount > 0 ? calculatedLoanAmount : 0);
  }

  function calculateInterestRate() {
    if (downPayment >= 2000000) {
      setInterestRate(10);
    } else if (downPayment < 2000000 && downPayment !== '') {
      setInterestRate(15);
    } else {
      // Default interest rate if downPayment is less than 2000000
      setInterestRate(0);
    }
  }

  function calculateInterestAmount() {
    const calculatedInterestAmount = (interestRate / 100) * downPayment;
    setInterestAmount(calculatedInterestAmount.toFixed(2));
  }

  function handleLoanTermChange(e) {
    setLoanTerm(Number(e.target.value));
  }

  function calculateTotalAmount() {
    const total = Number(downPayment) + Number(interestAmount);
    setTotalAmount(total.toFixed(2));
  }

  function calculatePaymentSchedule() {
    calculateTotalAmount(); // Ensure total amount is calculated before the payment schedule

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    const monthlyPayment =
      totalAmount / ((1 - Math.pow(1 + monthlyInterestRate, -totalPayments)) / monthlyInterestRate);

    let schedule = [];
    let remainingBalance = totalAmount;

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
    }

    setPaymentSchedule(schedule);
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormInput
          text="Home Value"
          icon={<FaDollarSign />}
          placeholder="Enter a value of home"
          onKeyUp={calculateLoanAmount}
          value={homevalue}
          onInput={(e) => {
            setHomeValue(e.target.value);
            calculateTotalAmount();
          }}
        />
        <FormInput
          text="Downpayment"
          icon={<FaDollarSign />}
          placeholder="Enter your funds"
          onKeyUp={() => {
            calculateLoanAmount();
            calculateInterestRate();
            calculateInterestAmount();
            calculateTotalAmount();
          }}
          value={downPayment}
          onInput={(e) => {
            setDownPayment(e.target.value);
            calculateTotalAmount();
          }}
        />
        <FormInput
          text="Loan"
          icon={<FaDollarSign />}
          placeholder="Funds needed"
          value={loanAmount}
          readOnly={true}
        />
        <FormInput
          text="Interest"
          icon={<FaDollarSign />}
          placeholder="The interest rate will be"
          value={interestAmount}
          readOnly={true}
        />
        <FormInput
          text="Total Amount"
          icon={<FaDollarSign />}
          placeholder="Total amount"
          value={totalAmount}
          readOnly={true}
        />
        <div className="mt-4">
          <label htmlFor="loanTerm">Loan Term (Years): </label>
          <select id="loanTerm" onChange={handleLoanTermChange} value={loanTerm}>
            {[1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-info text-light btn-lg w-100 center my-3"
          type="button"
          onClick={calculatePaymentSchedule}
        >
          Calculate
        </button>

        {/* Display Payment Schedule */}
        {paymentSchedule.length > 0 && (
          <div className="mt-4">
            <h4>Payment Schedule</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((payment) => (
                  <tr key={payment.month}>
                    <td>{payment.month}</td>
                    <td>{payment.payment}</td>
                    <td>{payment.principal}</td>
                    <td>{payment.interest}</td>
                    <td>{payment.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
