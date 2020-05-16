import React, { useState, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap'

const LoanDuration = (props) => {
    const [durationYears, setDurationYears] = useState("");
    const [durationMonths, setDurationMonths] = useState("");
    const [totalMonths, setTotalMonths] = useState("");

    useEffect(() => {
        props.parentCallback(totalMonths);
    }, [totalMonths]);

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

        if (durationYears !== "") {
            months += parseFloat(durationYears) * 12;
        }

        setDurationMonths(event.target.value);
        setTotalMonths(months);
    };

    return (
        <>
            <Row>
                <Form.Group controlId="formDurationYears">
                    <Form.Label>Years</Form.Label>
                    <Form.Control
                        name="durationYears"
                        type="number"
                        value={durationYears}
                        onChange={handleChangeYears}
                        placeholder="years"
                    />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="formDurationMonths">
                    <Form.Label>Months</Form.Label>
                    <Form.Control
                        name="durationMonths"
                        type="number"
                        value={durationMonths}
                        onChange={handleChangeMonth}
                        placeholder="months"
                    />
                </Form.Group>
            </Row>

        </>
    )
}
export default LoanDuration;