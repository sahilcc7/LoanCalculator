import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Container, Row, Col, } from 'react-bootstrap';

function LoanResults(props) {

  return (
    <Container fluid="md">
      <Row>
        <Col>Repayment:</Col>
        <Col xs={6}><CurrencyFormat value={props.results.monthlyPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>Balance:</Col>
        <Col xs={6}><CurrencyFormat value={props.results.balance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>Total number of repayments:</Col>
        <Col xs={6}>{props.results.numberOfRepayments}</Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>Total interest payable:</Col>
        <Col xs={6}><CurrencyFormat value={props.results.totalInterest} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>Total amount payable:</Col>
        <Col xs={6}><CurrencyFormat value={props.results.totalLoanAmt} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default LoanResults;
