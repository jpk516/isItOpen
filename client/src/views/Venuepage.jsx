import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import VenueForm from '../components/VenueForm'
// import CheckIn from '../components/CheckIn';
// import VenueDetails from '../components/VenueDetails';
import VenueService from '../services/venue-service';
//import Achievement from '../components/Achievement';

function VenuePage() {
    const [venueDetails, setVenueDetails] = useState({});
    const { name } = useParams();

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            })
        }
    }, [name, VenueService]);

    const formatPhoneNumber = (phoneNumber) => {
        // Remove any non-digit characters from the phone number
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        
        // Apply the phone number format (xxx-xxx-xxxx)
        const formatted = cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1-$2-$3-$4');
        
        return formatted;
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>{venueDetails.name}</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/brlist/" className="btn btn-primary me-md-2" role="button">Back</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row className="mb-3">
                <Col lg={3}>
                    <h4>Hours:</h4>
                </Col>
                <Col lg={6}>
                    <h4>Food: </h4>
                </Col>
            </Row>
            <hr/>
            <Row className="mb-3">
                <Col lg={3}>
                    <h4>Deals/Specials: </h4>
                </Col>
                <Col>
                <h4>Drink List:</h4>
                </Col>

            </Row>
            <hr/>
            <Row>
                <Col lg={6}>
                    <h4>Customer voted Drinks</h4>
                </Col>
                <Col lg={6}>
                    <h4>pictures/events?</h4>
                </Col>
            </Row>
            <hr/>
            <Row>
                <h3>{venueDetails.type} Details:</h3>
                <Col>
                    <p>Address: {venueDetails.address} {venueDetails.city}, {venueDetails.state} {venueDetails.zip}</p>
                    <p>Phone Number: {formatPhoneNumber(venueDetails.phone)}</p>
                    <p>Email: {venueDetails.emails}</p>
                    <p>Website: {venueDetails.websites}</p>
                </Col>
            </Row>
            

            {/* <Col>
                    <Achievement text="Gold Star" tooltipText="Achieved for excellence!" color="warning" />
                    <Achievement text="x10 Checkins" tooltipText="What a super star!" color="primary" />
                    <Achievement text="x20 Checkins" tooltipText="Achieved for excellence!" color="accent2" />
                </Col> */}
        </Container>
    );
}

export default VenuePage;