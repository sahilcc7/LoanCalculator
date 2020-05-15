import React, { useState, useEffect } from 'react';
import LoanForm from './loanForm';
import LoanResults from './loanResults';
import FlexLoanResults from './flexLoanResults';
import LoanAmortization from './loanAmortization';

const LoanCalculator = props => {
  const [formValue, setFormValues] = useState({
    price: "",
    duration: "",
    interestRate: "",
    flexiPayRepayment: "",
    flexiPayDuration: ""
  });

  const [results, setResults] = useState({
    totalPrincipal: "0",
    totalLoanAmt: "0",
    monthlyPayment: "0",
    totalInterest: "0",
    balance: "0"
  });

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

  useEffect(() => {
    displayResults();
  }, [formValue]);

  const displayResults = () => {
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

    setResults({
      totalPrincipal: "0",
      totalLoanAmt: "0",
      monthlyPayment: "0",
      totalInterest: "0",
      balance: "0"
    });

    setAmortization({
      resultsArray: [],
      totalInterestPaid: "",
      isHidden: true
    });

    setFlexiOption(false);
  };

  const getSum = (array, prop) => {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += parseFloat(array[i][prop]);
    }
    return total
  };

  const calcTotalPrincipal = (totalLoanAmt, totalInterest) => {
    /**
    * Calculate the Total Prinicipal Paid
    * @param {string} totalLoanAmt 
    * @param {string} totalInterest 
    * @return {float}
    */
    return (totalLoanAmt - totalInterest).toFixed(2);
  };

  const calcTotalInterest = (monthlyPayment, numMonths, principal) => {
    /**
    * Calculate the Total Interest Paid
    * @param {string} monthlyPayment 
    * @param {number} numMonths 
    * @param {number} principal 
    * @return {float}
    */
    return ((monthlyPayment * numMonths) - principal).toFixed(2);
  };
  const calcMonthlyPayment = (principal, toPower, interest) => {
    /**
    * Calculate the Monthly Payment
    * @param {string} principal 
    * @param {number} toPower 
    * @param {string} interest 
    * @return {float}
    */
    return ((principal * toPower * interest) / (toPower - 1)).toFixed(2);
  };

  const calcTotalLoanAmt = (numMonths, monthlyPayment) => {
    /**
    * Calculate the Total Loan Amount
    * @param {number} numMonths 
    * @param {string} monthlyPayment 
    * @return {float}
    */
    return (numMonths * monthlyPayment).toFixed(2);
  };

  const calcLoanResults = (formValue) => {
    /**
    * Parent function that calls the calcTotal functions to get the 
    * results from the loan form fields.
    * @param {obj} formValue 
    * @return {obj}
    */
    const principal = parseFloat(formValue.price);
    const interest = parseFloat(formValue.interestRate / 100 / 12);
    const numMonths = parseFloat(formValue.duration);
    const toPower = Math.pow(1 + interest, numMonths);
    const monthlyPayment = calcMonthlyPayment(principal, toPower, interest);
    const totalLoanAmt = calcTotalLoanAmt(numMonths, monthlyPayment);
    const totalInterest = calcTotalInterest(monthlyPayment, numMonths, principal);
    const totalPrincipal = calcTotalPrincipal(totalLoanAmt, totalInterest);

    return {
      monthlyPayment: monthlyPayment,
      totalLoanAmt: totalLoanAmt,
      totalPrincipal: totalPrincipal,
      totalInterest: totalInterest
    }
  };

  const setLoanResults = () => {
    /**
    * Sets the state of the Loan Results
    * @return {function} setState()
    */
    const loanResults = calcLoanResults(formValue);
    const balance = formValue.price;
    const monthlyPayment = loanResults.monthlyPayment;
    let totalInterest = loanResults.totalInterest;
    const totalPrincipal = loanResults.totalPrincipal;
    let totalLoanAmt = loanResults.totalLoanAmt;
    const duration = formValue.duration;

    let amortizationResults = calcAmortizationResults(totalPrincipal, duration, monthlyPayment);

    setResults({
      balance: balance,
      numberOfRepayments: duration,
      monthlyPayment: monthlyPayment,
      totalLoanAmt: parseFloat(totalLoanAmt).toFixed(2),
      totalPrincipal: totalPrincipal,
      totalInterest: parseFloat(totalInterest).toFixed(2)
    });

    setAmortization({
      resultsArray: amortizationResults,
      isHidden: false
    });

  };

  const setLoanResultsWithFlex = () => {
    /**
    * Sets the state of the Loan Results
    * @return {function} setState()
    */

    const loanResults = calcLoanResults(formValue);
    const duration = formValue.duration;
    const flexiPayRepayment = formValue.flexiPayRepayment;
    const flexiPayDuration = formValue.flexiPayDuration;
    const interest = formValue.interestRate;
    const totalPrincipal = formValue.price;

    let amortizationResults = caculateWithFlex(totalPrincipal, interest, flexiPayDuration, duration, flexiPayRepayment);
    let AmmortizationAfterFlexi = amortizationResults[flexiPayDuration];
    let LastFlexiAmmortization = amortizationResults[flexiPayDuration - 1];
    let totalInterest = getSum(amortizationResults, 'interestPayment');
    let AdditionalLoanBalance = LastFlexiAmmortization.endingPrincipal - totalPrincipal
    let totalLoanAmt = parseFloat(totalPrincipal) + totalInterest + AdditionalLoanBalance;
    let lastAmortization = amortizationResults.slice(-1)[0];
    let totalAdditionalAmountPayable = totalLoanAmt - loanResults.totalLoanAmt;

    setFlexResults({
      monthlyPaymentBefore: loanResults.monthlyPayment,
      monthlyPaymentAfter: AmmortizationAfterFlexi.monthlyPayment,
      lastPayment: lastAmortization.monthlyPayment,
      balanceBefore: totalPrincipal,
      balanceAfter: LastFlexiAmmortization.endingPrincipal,
      numberOfFlexibleRepayments: flexiPayDuration,
      numberOfRepaymentsAfter: amortizationResults.length - flexiPayDuration,
      totalNumberOfRepayments: amortizationResults.length,
      totalInterest: (totalInterest + AdditionalLoanBalance).toFixed(2),
      totalLoanAmt: totalLoanAmt.toFixed(2),
      totalAdditionalAmountPayable: parseFloat(totalAdditionalAmountPayable).toFixed(2)
    });

    setAmortization({
      resultsArray: amortizationResults,
      isHidden: false
    });
  };

  const caculateWithFlex = (principal, interest, duration, numberOfPay, flexPayment) => {
    let amortizationArray = [];
    let afterFlex = numberOfPay - duration;
    const interestRate = interest / 100 / 12;

    for (let i = 1; i <= duration; i++) {
      let last = amortizationArray.slice(-1)[0];
      const previousBalance = last ? last.endingPrincipal : principal;
      const interestCharge = previousBalance * interestRate;

      const principalLeft = previousBalance - flexPayment + interestCharge;
      const interestPaid = flexPayment > interestCharge ? interestCharge : flexPayment;
      const principalPaid = flexPayment > interestCharge ?
        flexPayment - interestCharge :
        0;
      let amortizationMonth = {
        monthlyPayment: parseFloat(flexPayment).toFixed(2),
        principalPaid: parseFloat(principal).toFixed(2),
        interestPayment: parseFloat(interestPaid).toFixed(2),
        principalPayment: parseFloat(principalPaid).toFixed(2),
        endingPrincipal: parseFloat(principalLeft).toFixed(2)
      };
      amortizationArray.push(amortizationMonth);
    }

    let last = amortizationArray.slice(-1)[0];
    let followingPay = Math.ceil(getPaymentAmount(interestRate, last.endingPrincipal, afterFlex));

    for (let i = duration + 1; i <= numberOfPay; i++) {
      let last = amortizationArray.slice(-1)[0];
      let principalLeft = last.endingPrincipal;
      let interestCharge = 0;
      let principalPaid = 0;

      if (followingPay > principalLeft) {
        followingPay = principalLeft;
        principalPaid = followingPay - interestCharge;
        principalLeft = 0;
      } else {
        interestCharge = principalLeft * interestRate;
        principalPaid = followingPay - interestCharge;
        principalLeft = principalLeft - principalPaid;
      }

      let amortizationMonth = {
        monthlyPayment: parseFloat(followingPay).toFixed(2),
        principalPaid: parseFloat(principal).toFixed(2),
        interestPayment: parseFloat(interestCharge).toFixed(2),
        principalPayment: parseFloat(principalPaid).toFixed(2),
        endingPrincipal: parseFloat(principalLeft).toFixed(2)
      };

      amortizationArray.push(amortizationMonth);

    }

    return amortizationArray;
  };

  const getPaymentAmount = (interest, balance, num) => {
    let amount = (interest * balance) / (1 - Math.pow((1 + interest), -num))

    return amount
  };

  const calcAmortizationResults = (totalPrincipal, duration, monthlyPayment) => {
    /**
    * Calculates the Amortization values
    * Formula from:  https://m.wikihow.com/Calculate-Amortization
    * @param {string} totalPrincipal 
    * @param {string} duration 
    * @param {string} monthlyPayment 
    * @return {array} amortizationArray
    */
    const interestRate = formValue.interestRate / 100 / 12;

    let principal = totalPrincipal;
    let payThisMuch = parseFloat(monthlyPayment);
    let interestPayment = principal * interestRate;
    let principalPayment = payThisMuch - interestPayment;
    let endingPrincipal = principal - principalPayment;
    let amortizationArray = [];

    for (let i = 0; i < duration; i++) {

      if (monthlyPayment > endingPrincipal) {
        payThisMuch = endingPrincipal;
        principalPayment = payThisMuch - interestPayment;
        endingPrincipal = 0;
      } else {
        interestPayment = principal * interestRate;
        principalPayment = payThisMuch - interestPayment;
        endingPrincipal = principal - principalPayment;
      }

      principal = endingPrincipal;

      let amortizationMonth = {
        monthlyPayment: payThisMuch.toFixed(2),
        principalPaid: principal.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        endingPrincipal: endingPrincipal.toFixed(2)
      };

      amortizationArray.push(amortizationMonth);
    }

    return amortizationArray;
  }

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
      <LoanForm parentCallback={formCallback} toggleFlexiPayCallback={toggleFlexiPayCallback} resetCallback={resetState.bind(this)} />
      {flexiOption ? <FlexLoanResults results={flexResults} /> : <LoanResults results={results} />}
      <LoanAmortization table={amortization} />
    </div>
  );

}

export default LoanCalculator;
