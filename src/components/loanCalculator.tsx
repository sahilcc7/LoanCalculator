import * as React from "react";
import LoanForm from './loanForm';
import LoanResults from './loanResults';
import LoanAmortization from './loanAmortization';
import { Container } from 'react-bootstrap';
import { SetLoanResultsWithFlex, SetLoanResults } from './Calculator'

const LoanCalculator = props => {
  const [formKey, setFormKey] = React.useState(Math.random);

  const [formValue, setFormValues] = React.useState({
    price: 0,
    duration: 0,
    interestRate: 0,
    flexiPayRepayment: 0,
    flexiPayDuration: 0,
    isError:false
  });

  const [flexiOption, setFlexiOption] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [amortization, setAmortization] = React.useState({
    resultsArray: [],
    totalInterestPaid: "",
    isHidden: true
  });

  const displayResults = () => {
    if (formValue.isError === true) return;

    let calcResults = flexiOption === true ? SetLoanResultsWithFlex(formValue) : SetLoanResults(formValue);
    setResults(calcResults.Results);
    setAmortization(calcResults.Amortization);
  };

  const resetState = () => {
    setFormValues({
      price: 0,
      duration: 0,
      interestRate: 0,
      flexiPayRepayment: 0,
      flexiPayDuration: 0,
      isError:false
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
