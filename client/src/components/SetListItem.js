import { useState } from 'react';

import PlateWindow from './PlateWindow'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SetListItem({ set, wMax, completed, setProgressions, id, userId, wP }){

    const [completedReps, setCompletedReps] = useState(1);

    const {weight, plates } = wP

    const renderPlates = Object.entries(plates).map(entry => (
        <li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>

    ))
    
    const { num, reps, week_id: week } = set
    const toggleClass = completed ? 'completed-class' : null

    const amrap = num === 3 && week !== 4 ? '+' : null


    function handleSubmit(e){
        e.preventDefault();

        const max = { 
            reps: parseInt(completedReps),
            weight,
        }

        console.log(max)
        fetch(`/progressions/user/${userId}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(max)

        })
            .then(r => r.json())
            .then(data => setProgressions(data))
    }

    return (
        <ListGroup.Item>
            <h2 className={toggleClass} id="set-text">
                {reps} {amrap} reps @ {weight} pounds 
            </h2>
            <PlateWindow plates={plates} />
            { num === 3 ? (
            <Form id="set-form" onSubmit={handleSubmit}>
                <Form.Group 
                    as={Row} 
                    className="set-form-group"
                    controlId="formHorizontalCompletedReps"
                >
                    <Form.Label id="set-form-label" column sm={7} xs={7}>Reps Performed:</Form.Label>
                    <Col sm={2} xs={3}>
                        <Form.Control
                            id="set-form-input"
                            type="number"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={completedReps}
                            onChange={(e => setCompletedReps(e.target.value))}
                        />
                    </Col>
                </Form.Group>
                {/* <Form.Group className="form-group">
                    <Form.Label>Reps Performed:</Form.Label>
                    <Form.Control
                        id="set-input"
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={completedReps}
                        onChange={(e => setCompletedReps(e.target.value))}
                    />
                </Form.Group> */}
                <Form.Group className="form-group">
                    <Button 
                        id="set-submit" 
                        type="submit" 
                        variant="outline-danger"
                        disabled={completed ? true : false}
                    >
                        Complete
                    </Button>
                </Form.Group>
            </Form>
            ) : null }
        </ListGroup.Item>
    )
}

export default SetListItem;

