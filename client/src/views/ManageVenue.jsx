import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VenueForm from '../components/VenueForm'
import CheckIn from '../components/CheckIn';
import VenueDetails from '../components/VenueDetails';
import VenueService from '../services/venue-service';
import Achievement from '../components/Achievement';

function ManageVenue() {
    const [venueDetails, setVenueDetails] = useState({});
    const { name } = useParams();

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            }).catch(error => {
                setErrorMessage(error.message)
            });
        }
    }, [name, VenueService]);


    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Manage Venue</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/venues/" className="btn btn-primary me-md-2" role="button">Back</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row className="mb-3">
                <Col>
                    <VenueDetails venue={venueDetails} />
                </Col>
                <Col>
                    <CheckIn venue="Venue" />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col lg={10}>
                    <VenueForm />
                </Col>
                <Col>
                    <Achievement text="Gold Star" tooltipText="Achieved for excellence!" color="warning" />
                    <Achievement text="x10 Checkins" tooltipText="What a super star!" color="primary" />
                    <Achievement text="x20 Checkins" tooltipText="Achieved for excellence!" color="accent2" />
                </Col>
            </Row>
            
        </Container>
    );
}

export default ManageVenue;