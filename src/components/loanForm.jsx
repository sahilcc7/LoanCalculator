import React from 'react';
import CurrencyFormat from 'react-currency-format';
import LoanDuration from './loanDuration';

class LoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      duration: "",
      interestRate: "",
      flexiPayOption: false,
      flexiPayDuration: "",
      flexiPayRepayment: "",
      isError: false,
      durationKey : Math.random()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  sendParentFormValues() {
    /**
    * Sends state values to Parent Callback function
    * @return {function} parentCallback()
    */
    this.props.parentCallback(this.state)
  }

  handleReset(){
    this.setState(
      {
        price: "",
        duration: "",
        interestRate: "",
        flexiPayOption: false,
        flexiPayDuration: "",
        flexiPayRepayment: "",
        isError: false,
        durationKey : Math.random(),
      }, function() {
        this.props.resetCallback(this.state);
      }
    );

    
  }
  handleChange(event) {
    /**
    * Handles form input field event changes
    * @param {obj} event 
    * @return {function} setState()
    */
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  checkFormValues() {
    /**
    * Checks if form field inputs are valid (empty or below a certain number)
    * @return {bool}
    */
  if (   
      this.state.price === "" || 
      this.state.duration === "" ||
      this.state.interestRate === "" ||
      this.state.duration < 1 ||
      (this.state.flexiPayOption === true  && (this.state.flexiPayRepayment === "" || this.state.flexiPayDuration === "")  ) ||
      this.state.interestRate < 0.01
     ) {
      return true;
    } else {
      return false;
    }
  }

  triggerErrorMsg() {
    /**
    * Sets the error message in state to true
    * @return {function} setState()
    */
    this.setState({
      isError: true
    })
  }

  hideErrorMsg() {
    /**
    * Sets the error message in state to false
    * @return {function} setState()
    */
    this.setState({
      isError: false
    })
  }

  handleSubmit(event) {
    /**
    * Handles the submit btn in the form fields
    * @param {obj} event 
    * @return {function} triggerErrorMsg()
    * @return {function} hideErrorMsg()
    * @return {function} sendParentFormValues()
    */
    event.preventDefault();
    const isError = this.checkFormValues();

    if (isError) {
      this.triggerErrorMsg();
    } else {
      this.hideErrorMsg();
      this.sendParentFormValues();
    } 
  }

  formCallback = (durationInMonths) => {
    this.setState({
      duration: durationInMonths
     });
  }

  formFlexiPayCallback = (durationInMonths) => {
    this.setState({
      flexiPayDuration: durationInMonths
     });
  }

  toggleChange = () => {
    this.setState({
      flexiPayOption: !this.state.flexiPayOption,
    }, function(){
      this.props.toggleFlexiPayCallback(this.state.flexiPayOption);
    });
  }
  render() {
    const isError = this.state.isError ? "show-fast" : "hide-fast";

    return (
      <div className="loan-form-container component">
        <form onSubmit={this.handleSubmit}>
          <div className="input-container ">
            <label htmlFor="price">Balance</label>
            <div className="form-container price">
              <CurrencyFormat value={this.state.price} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
                  const {formattedValue, value} = values;
                  this.setState({price: value})
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
              value={this.state.interestRate} 
              onChange={this.handleChange}/>
              <div className="symbol">%</div>
            </div>
          </div>
          <LoanDuration key={this.state.durationKey} parentCallback={this.formCallback}/>
          <div className="input-container">
            <label htmlFor="flexiPayOption">Flexible Repayment</label>
            <div className="form-container flexiPayOption">
            <label className="switch">
              <input 
                name="flexiPayOption" 
                type="checkbox"
                checked={this.state.flexiPayOption}
                onChange={this.toggleChange}/>
              <div className="slider round"></div>
              </label>
            </div>
          </div>
          {
            this.state.flexiPayOption
            ?
            <div>
              <div className="input-container" >
              <label htmlFor="flexiPayRepayment">Flex Repayment</label>
              <div className="form-container price">
                <CurrencyFormat value={this.state.flexiPayRepayment} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
                    const {formattedValue, value} = values;
                    this.setState({flexiPayRepayment: value})
                }}/>
              </div>
            </div>
            <LoanDuration key={this.state.durationKey} parentCallback={this.formFlexiPayCallback}/></div>
            : null
          }
          
          <div className="input-container submit-button">
            <input type="submit" value="Calculate Loan" />
            <input type="button" value="Reset" onClick={this.handleReset} />
            <div className={`error-msg-container ${isError}`}>
              <p>Please make sure you have non-empty, valid numbers in your form fields.</p>
            </div>
          </div>
        </form>

        
      </div>
    )
  }
}

export default LoanForm;
