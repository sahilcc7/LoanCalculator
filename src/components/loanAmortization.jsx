import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Table from 'react-bootstrap/Table';
import '../App.scss';

class LoanAmortization extends React.Component {
  renderTableRows(array) {
    /**
    * Render Loam Amortization Table rows
    * @param {array} array 
    * @return {string} num
    */  
    return array.map( (rowObj, index) => {
      let month = index + 1;

      return (
          <tr key={index}>
            <td className="month column">{month}</td>
            <td className="monthly-payment column"><CurrencyFormat value={rowObj.monthlyPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
            <td className="interest-payment column"><CurrencyFormat value={rowObj.interestPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td> 
            <td className="principal-payment column"><CurrencyFormat value= {rowObj.principalPayment} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
            <td className="principal-left column"><CurrencyFormat value={rowObj.endingPrincipal} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
          </tr>
        )
    });
  }

  render() {
    const hiddenClass = this.props.table.isHidden ? "hide" : "show";
    const amortizationArray = this.props.table.resultsArray;

    return (
      <div className={`loan-table-container component ${hiddenClass}`}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="month column"></th>
              <th>Repayment</th> 
              <th>Interest Payment</th> 
              <th>Principal Payment</th>
              <th>Principal Left</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows(amortizationArray)}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default LoanAmortization;
