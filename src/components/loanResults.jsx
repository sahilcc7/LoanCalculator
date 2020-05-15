import React from 'react';
import CurrencyFormat from 'react-currency-format';
function LoanResults(props) {

  return (
      <div className="loan-results-container component">
        <div>
          <p><span>Repayment: </span><CurrencyFormat value={props.results.monthlyPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
        </div>
  
        <div>
          <p><span>Balance: </span><CurrencyFormat value={props.results.balance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
          <p><span>Total number of repayments: </span>{props.results.numberOfRepayments}</p>
          <p><span>Total interest payable: </span><CurrencyFormat value={props.results.totalInterest} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
          <p><span>Total amount payable: </span><CurrencyFormat value={props.results.totalLoanAmt} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
        </div>
      </div>
    )
}

export default LoanResults;
