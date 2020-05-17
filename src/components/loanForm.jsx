import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import LoanDuration from './loanDuration';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../App.scss';

const LoanForm = props => {
  const [state, setState] = useState({
    price: "",
    duration: "",
    interestRate: "",
    flexiPayOption: false,
    flexiPayDuration: "",
    flexiPayRepayment: "",
    isError: false,
    durationKey: Math.random()
  });

  useEffect(() => {
    props.toggleFlexiPayCallback(state.flexiPayOption)
  }, [state.flexiPayOption]);

  useEffect(() => {
    sendParentFormValues();
  },[state])

  const sendParentFormValues = () => {
    /**
    * Sends state values to Parent Callback function
    * @return {function} parentCallback()
    */
    props.parentCallback(state)
  }

  const handleReset = () => {
    props.resetCallback();
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
      {
        ...state,
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
      (state.flexiPayOption === true && (state.flexiPayRepayment === "" || state.flexiPayDuration === "")) ||
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

  const hideErrorMsg = () => {
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
      props.submitCallback();
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
    <Container fluid="sm">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group controlId="formPrice">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={state.price}
              onChange={handleChange}
              placeholder="outstanding balance" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formInterestRate">
            <Form.Label>Interest Rate</Form.Label>
            <Form.Control
              name="interestRate"
              type="number"
              value={state.interestRate}
              onChange={handleChange}
              placeholder="interest rate"
            />
          </Form.Group>
        </Row>
        <LoanDuration key={state.durationKey} parentCallback={formCallback} />
        <Row>
          <Form.Group controlId="formFlexiOption">
            <Form.Label>Flexible Repayment</Form.Label>
            <Form.Control
              name="flexiPayOption"
              type="checkbox"
              value={state.flexiPayOption}
              onChange={toggleChange} />
          </Form.Group>
        </Row>

        {
          state.flexiPayOption
            ?
            <>
              <Row>
                <Form.Group controlId="formflexiPayRepayment">
                  <Form.Label>Flex Repayment</Form.Label>
                  <Form.Control
                    name="flexiPayRepayment"
                    type="number"
                    value={state.flexiPayRepayment}
                    onChange={handleChange}
                    placeholder="flexible repayment" />
                </Form.Group>
              </Row>
              <LoanDuration key={state.durationKey} parentCallback={formFlexiPayCallback} />
            </>
            : null
        }
        <Row>
          <Col md="auto"><Button variant="primary" type="submit">Calculate Loan</Button></Col>
          <Col><Button variant="secondary" type="button" onClick={handleReset}>Reset</Button></Col>
        </Row>

      </Form>

      <div>
        <div className={`error-msg-container ${isError}`}>
          <p>Please make sure you have non-empty, valid numbers in your form fields.</p>
        </div>
      </div>
    </Container>
  )
}

export default LoanForm;
