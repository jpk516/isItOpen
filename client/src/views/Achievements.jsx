import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Achievement from '../components/Achievement';

function Achievements() {
    
    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <h2>Your Achievements</h2>
                    </Col>
                    <hr />
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Stack direction="horizontal" gap={3}>
                            <Achievement text="Early Riser" tooltipText="Awarded for being one of the first 100 people to use IIO - 1/1/1965" color="warning" />
                            <Achievement text="x10 Checkins" tooltipText="Awarded for making 10 check-in updates. - 1/1/1965" color="primary" />
                            <Achievement text="x20 Checkins" tooltipText="Awarded for making 20 check-in updates. - 1/1/1965" color="accent2" />
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    );  
}

export default Achievements;