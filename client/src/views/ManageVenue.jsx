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
            <Row>
                <Col>
                    <VenueForm />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CheckIn venue="Venue" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <VenueDetails venue={venueDetails} />
                </Col>
            </Row>
        </Container>
    );
}

export default ManageVenue;