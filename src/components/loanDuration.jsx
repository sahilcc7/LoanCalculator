import React from 'react';

class LoanDuration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            durationYears : "",
            durationMonths : "",
            duration: ""
        };

        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handleChangeYears = this.handleChangeYears.bind(this);
    }

    handleChangeYears(event) {
        let months = 0;

        if (event.target.value !== "")
        {
            months = parseFloat(event.target.value) * 12;
        }

        if (this.state.durationMonths !== "")
        {
            months += parseFloat(this.state.durationMonths);
        }

        this.setState({
            durationYears : event.target.value
        }, ()=> {
            this.props.parentCallback(months); 
        });
      }

      
    handleChangeMonth(event) {
        let months = 0;

        if (event.target.value !== "")
        {
            months = parseFloat(event.target.value);
        }

        if (this.state.durationYears !== "")
        {
            months += parseFloat(this.state.durationYears) * 12;
        }

        this.setState({
            durationMonths : event.target.value
        }, () => {
            this.props.parentCallback(months); 
        });
      }
 
      render() {
          return (
            <>
                <div className="input-container">
                    <label htmlFor="durationYears">Years</label>
                    <div className="form-container duration">
                        <input 
                        name="durationYears" 
                        type="number"
                        value={this.state.durationYears}
                        onChange={this.handleChangeYears}/>
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="durationMonths">Months</label>
                    <div className="form-container duration">
                        <input 
                        name="durationMonths" 
                        type="number"
                        value={this.state.durationMonths}
                        onChange={this.handleChangeMonth}/>
                    </div>
                </div>
            </>
          )
      }
}
export default LoanDuration;