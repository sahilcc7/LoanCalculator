import React, { useState, useEffect, useRef } from 'react';
import LoanForm from './loanForm';
import LoanResults from './loanResults';
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

  const [flexiOption, setFlexiOption] = useState(false);
  const [results, setResults] = useState([]);
  const [amortization, setAmortization] = useState({
    resultsArray: [],
    totalInterestPaid: "",
    isHidden: true
  });

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
    setFlexiOption(false);
    setFormKey(Math.random);
    setResults([]);
    setAmortization({
      resultsArray: [],
      totalInterestPaid: "",
      isHidden: true
    });
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
