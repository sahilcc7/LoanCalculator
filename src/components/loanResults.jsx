import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Container, Row, Col, } from 'react-bootstrap';

function LoanResults(props) {

  return (
    <Container fluid="md">
      {
        props.results.map( (result,index) => {
          
          return (
            <Row key={index}>
              <Col>{result.Label}</Col>
              <Col xs={6}>{result.Value}</Col>
              <Col></Col>
            </Row>
          )
        })
      }
    </Container>
  )
}

export default LoanResults;
