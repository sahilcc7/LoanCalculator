import React, {useState, useEffect} from 'react';

const LoanDuration = (props) => {
    const [durationYears,setDurationYears] = useState("");
    const [durationMonths,setDurationMonths] = useState("");
    const [totalMonths,setTotalMonths] = useState("");

    useEffect(()=>{
        props.parentCallback(totalMonths);
    },[totalMonths]);
    
    const handleChangeYears = (event) => {
        let months = 0;

        if (event.target.value !== "") {
            months = parseFloat(event.target.value) * 12;
        }

        if (durationMonths !== "") {
            months += parseFloat(durationMonths);
        }

        setDurationYears(event.target.value);
        setTotalMonths(months);
    };


    const handleChangeMonth = (event) => {
        let months = 0;

        if (event.target.value !== "") {
            months = parseFloat(event.target.value);
        }

        if (this.state.durationYears !== "") {
            months += parseFloat(durationYears) * 12;
        }

        setDurationMonths(event.target.value);
        setTotalMonths(months);
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor="durationYears">Years</label>
                <div className="form-container duration">
                    <input
                        name="durationYears"
                        type="number"
                        value={durationYears}
                        onChange={handleChangeYears} />
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="durationMonths">Months</label>
                <div className="form-container duration">
                    <input
                        name="durationMonths"
                        type="number"
                        value={durationMonths}
                        onChange={handleChangeMonth} />
                </div>
            </div>
        </>
    )

}
export default LoanDuration;