import * as React from "react";
import { Form, Row } from 'react-bootstrap'

interface Props {
    parentCallback: (months: number) => void;
}

const LoanDuration = (props: Props) => {
    const [durationYears, setDurationYears] = React.useState(0);
    const [durationMonths, setDurationMonths] = React.useState(0);
    const [totalMonths, setTotalMonths] = React.useState(0);

    React.useEffect(() => {
        props.parentCallback(totalMonths);
    }, [totalMonths]);

    const convertYearsToMonths: (years: number) => number =
    function(x) { return x * 12; };


    const handleChangeYears = (event: React.ChangeEvent<HTMLInputElement>) => {
        let months : number  = 0;

        if (event.target.value !== "") {
            months = convertYearsToMonths(parseFloat(event.target.value));
        }

        months += durationMonths;

        setDurationYears(parseFloat(event.target.value));
        setTotalMonths(months);
    };


    const handleChangeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
        let months : number = 0;

        if (event.target.value !== "") {
            months = parseFloat(event.target.value);
        }

        months += convertYearsToMonths(durationYears);

        setDurationMonths(parseFloat(event.target.value));
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