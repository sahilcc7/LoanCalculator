import React from 'react';
import CurrencyFormat from 'react-currency-format';

const FlexLoanResults = (props) => {

  return (
      <div className="loan-results-container component">
        <div>
             <p>Flexible repayment option</p>   
        </div>
        <div>
            <p><span>Repayment before: </span><CurrencyFormat value={props.results.monthlyPaymentBefore} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p><span>Repayment after: </span><CurrencyFormat value={props.results.monthlyPaymentAfter} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p><span>Last payment: </span><CurrencyFormat value={props.results.lastPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p>&nbsp;</p>
            <p><span>Balance before: </span><CurrencyFormat value={props.results.balanceBefore} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p><span>Balance after: </span><CurrencyFormat value={props.results.balanceAfter} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p>&nbsp;</p>
            <p><span>Number of flexible repayments: </span>{props.results.numberOfFlexibleRepayments}</p>
            <p><span>Number of repayments after: </span>{props.results.numberOfRepaymentsAfter}</p>    
            <p><span>Total number of repayments: </span>{props.results.totalNumberOfRepayments}</p>    
            <p>&nbsp;</p>
            <p><span>Total interest payable: </span><CurrencyFormat value={props.results.totalInterest} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <p><span>Total amount payable: </span><CurrencyFormat value={props.results.totalLoanAmt} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>   
            <p><span>Total additional amount payable: </span><CurrencyFormat value={props.results.totalAdditionalAmountPayable} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>         
        </div>
      </div>
    )
}

export default FlexLoanResults;

