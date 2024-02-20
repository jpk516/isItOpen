import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VenueList from '../components/VenueList';
import { NavLink } from "react-router-dom";

function Venues() {
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Venue List</h2>
                </Col>
                <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/venues/manage" className="btn btn-primary me-md-2" role="button">Add Venue</NavLink>
                    </div>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <VenueList />
                </Col>
            </Row>
        </Container>
    );
}

export default Venues;