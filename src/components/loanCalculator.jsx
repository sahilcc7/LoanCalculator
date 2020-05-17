import React, { useState, useEffect, useRef } from 'react';
import LoanForm from './loanForm';
import LoanResults from './loanResults';
import FlexLoanResults from './flexLoanResults';
import LoanAmortization from './loanAmortization';
import { Container } from 'react-bootstrap';
import Calculator from './Calculator'

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

/*   useEffect(() => {
    displayResults();
  }, [formValue]); */

  const displayResults = () => {
    if (formValue.isError !== false) return;

    if (flexiOption === true) {
      setLoanResultsWithFlex();
    }
    else {
      setLoanResults();
    }
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

  const getSum = (array, prop) => {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += parseFloat(array[i][prop]);
    }
    return total
  };

  

  const setLoanResults = () => {
    /**
    * Sets the state of the Loan Results
    * @return {function} setState()
    */

    const loanResults = Calculator.calcLoanResults(formValue);
    const balance = formValue.price;
    const monthlyPayment = loanResults.monthlyPayment;
    let totalInterest = loanResults.totalInterest;
    const totalPrincipal = loanResults.totalPrincipal;
    let totalLoanAmt = loanResults.totalLoanAmt;
    const duration = formValue.duration;

    let amortizationResults = Calculator.calcAmortizationResults(totalPrincipal, duration, monthlyPayment);
    let results = [];
    results.push(
      {
        "Label": "Balance",
        "Value": balance
      }
    );

    results.push(
      {
        "Label": "Number of repayments",
        "Value": duration
      }
    );

    results.push(
      {
        "Label": "Monthly repayment",
        "Value": monthlyPayment
      }
    );

    results.push(
      {
        "Label": "Total amount payable",
        "Value": parseFloat(totalLoanAmt).toFixed(2)
      }
    );

    results.push(
      {
        "Label": "Total interest payable",
        "Value": parseFloat(totalInterest).toFixed(2)
      }
    );

    setResults(results);

    setAmortization({
      resultsArray: amortizationResults,
      isHidden: false
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
