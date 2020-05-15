import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import LoanDuration from './loanDuration';

const LoanForm = props => {
    const [state,setState] = useState({
      price: "",
      duration: "",
      interestRate: "",
      flexiPayOption: false,
      flexiPayDuration: "",
      flexiPayRepayment: "",
      isError: false,
      durationKey : Math.random()
    });

  useEffect(() => {
      props.toggleFlexiPayCallback(state.flexiPayOption)
    }, [state.flexiPayOption]);

  const sendParentFormValues = () => {
    /**
    * Sends state values to Parent Callback function
    * @return {function} parentCallback()
    */
    props.parentCallback(state)
  }

  const handleReset = () =>{
    props.resetCallback();

    setState({
      price: "",
      duration: "",
      interestRate: "",
      flexiPayOption: false,
      flexiPayDuration: "",
      flexiPayRepayment: "",
      isError: false,
      durationKey : Math.random()
    });


  };

  const handleChange = (event) => {
    /**
    * Handles form input field event changes
    * @param {obj} event 
    * @return {function} setState()
    */
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState(
      {...state,
      [name]: value
    });
  }

  const checkFormValues = () => {
    /**
    * Checks if form field inputs are valid (empty or below a certain number)
    * @return {bool}
    */
  if (   
      state.price === "" || 
      state.duration === "" ||
      state.interestRate === "" ||
      state.duration < 1 ||
      (state.flexiPayOption === true  && (state.flexiPayRepayment === "" || state.flexiPayDuration === "")  ) ||
      state.interestRate < 0.01
     ) {
      return true;
    } else {
      return false;
    }
  };

  const triggerErrorMsg = () => {
    /**
    * Sets the error message in state to true
    * @return {function} setState()
    */
    setState({
      ...state,
      isError: true
    })
  };

  const hideErrorMsg = () =>{
    /**
    * Sets the error message in state to false
    * @return {function} setState()
    */
    setState({
      ...state,
      isError: false
    })
  };

  const handleSubmit = (event) => {
    /**
    * Handles the submit btn in the form fields
    * @param {obj} event 
    * @return {function} triggerErrorMsg()
    * @return {function} hideErrorMsg()
    * @return {function} sendParentFormValues()
    */
    event.preventDefault();
    const isError = checkFormValues();

    if (isError) {
      triggerErrorMsg();
    } else {
      hideErrorMsg();
      sendParentFormValues();
    } 
  };

  const formCallback = (durationInMonths) => {
    setState({
      ...state,
      duration: durationInMonths
     });
  }

  const formFlexiPayCallback = (durationInMonths) => {
    setState({
      ...state,
      flexiPayDuration: durationInMonths
     });
  }

  const toggleChange = () => {
    setState({
      ...state,
      flexiPayOption: !state.flexiPayOption,
    });
  }

    const isError = state.isError ? "show-fast" : "hide-fast";

    return (
      <div className="loan-form-container component">
        <form onSubmit={handleSubmit}>
          <div className="input-container ">
            <label htmlFor="price">Balance</label>
            <div className="form-container price">
              <CurrencyFormat value={state.price} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
                  const {formattedValue, value} = values;
                  setState({...state,price: value})
              }}/>
              </div>
          </div>
          <div className="input-container">
            <label htmlFor="interestRate">Interest Rate</label>
            <div className="form-container interest">
              <input 
              name="interestRate" 
              type="number"
              step="any"
              min="0"
              max="1000" 
              value={state.interestRate} 
              onChange={handleChange}/>
              <div className="symbol">%</div>
            </div>
          </div>
          <LoanDuration key={state.durationKey} parentCallback={formCallback}/>
          <div className="input-container">
            <label htmlFor="flexiPayOption">Flexible Repayment</label>
            <div className="form-container flexiPayOption">
            <label className="switch">
              <input 
                name="flexiPayOption" 
                type="checkbox"
                checked={state.flexiPayOption}
                onChange={toggleChange}/>
              <div className="slider round"></div>
              </label>
            </div>
          </div>
          {
            state.flexiPayOption
            ?
            <div>
              <div className="input-container" >
              <label htmlFor="flexiPayRepayment">Flex Repayment</label>
              <div className="form-container price">
                <CurrencyFormat value={state.flexiPayRepayment} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    setState({...state,flexiPayRepayment: value})
                }}/>
              </div>
            </div>
            <LoanDuration key={state.durationKey} parentCallback={formFlexiPayCallback}/></div>
            : null
          }
          
          <div className="input-container submit-button">
            <input type="submit" value="Calculate Loan" />
            <input type="button" value="Reset" onClick={handleReset} />
            <div className={`error-msg-container ${isError}`}>
              <p>Please make sure you have non-empty, valid numbers in your form fields.</p>
            </div>
          </div>
        </form>

      </div>
    )

}

export default LoanForm;
