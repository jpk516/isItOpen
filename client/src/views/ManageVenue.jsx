import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Tabs, Tab } from 'react-bootstrap';

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
                        <NavLink to="/admin/" className="btn btn-primary me-md-2" role="button">Back</NavLink>
                    </div>
                </Col>
            </Row>
            <Tabs defaultActiveKey="edit" id="admin-panel-tabs" className="mb-3">
                <Tab eventKey="edit" title="Edit">
                    <Row className="mb-3">
                        <Col lg={10}>
                            <VenueForm />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="checkins" title="Moderate Check-ins">
                    <Row className="mb-3">
                        
                    </Row>
                </Tab>
                <Tab eventKey="public" title="Public View">
                    <Row className="mb-3">
                        <Col>
                            <VenueDetails venue={venueDetails} />
                        </Col>
                        <Col>
                            <CheckIn venue="Venue" />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default ManageVenue;