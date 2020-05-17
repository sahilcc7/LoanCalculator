import React, { useState, useEffect, useRef } from 'react';
import LoanForm from './loanForm';
import LoanResults from './loanResults';
import FlexLoanResults from './flexLoanResults';
import LoanAmortization from './loanAmortization';
import { Container } from 'react-bootstrap';
import { SetLoanResultsWithFlex, SetLoanResults } from './Calculator'

const LoanCalculator = props => {
  const [formKey, setFormKey] = useState(Math.random);

  const [formValue, setFormValues] = useState({
    price: "",
    duration: "",
    interestRate: "",
    flexiPayRepayment: "",
    flexiPayDuration: ""
  });

  const [results, setResults] = useState([]);

  const [flexResults, setFlexResults] = useState({
    monthlyPaymentBefore: "0",
    monthlyPaymentAfter: "0",
    lastPayment: "0",
    balanceBefore: "0",
    balanceAfter: "0",
    numberOfFlexibleRepayments: "0",
    numberOfRepaymentsAfter: "0",
    totalNumberOfRepayments: "0",
    totalInterest: "0",
    totalLoanAmt: "0",
    totalAdditionalAmountPayable: "0"
  });

  const [amortization, setAmortization] = useState({
    resultsArray: [],
    totalInterestPaid: "",
    isHidden: true
  });

  const [flexiOption, setFlexiOption] = useState(false);


  const displayResults = () => {
    if (formValue.isError !== false) return;

    let calcResults = flexiOption === true ? SetLoanResultsWithFlex(formValue) : SetLoanResults(formValue);

    setResults(calcResults.Results);
    setAmortization(calcResults.Amortization);
  };

  const resetState = () => {
    setFormValues({
      price: "",
      duration: "",
      interestRate: "",
      flexiPayRepayment: "",
      flexiPayDuration: ""
    });

    setResults([]);

    setAmortization({
      resultsArray: [],
      totalInterestPaid: "",
      isHidden: true
    });

    setFlexiOption(false);

    setFormKey(Math.random);
  };

  const toggleFlexiPayCallback = (flexiOption) => {
    setFlexiOption(flexiOption);
  };

  const formCallback = (formValues) => {
    /**
    * Parent callback function called by child component, LoanForm
    * @param {obj} formValues 
    * @return {function} setState()
    * @return {function} setLoanResults()
    */

    setFormValues(formValues);
  };


  return (
    <div>
      <Container key={formKey}>
        <LoanForm
          submitCallback={displayResults}
          parentCallback={formCallback}
          toggleFlexiPayCallback={toggleFlexiPayCallback}
          resetCallback={resetState.bind(this)} />
        <LoanResults results={results} />
        <LoanAmortization table={amortization} />
      </Container>
    </div>
  );

}

export default LoanCalculator;
