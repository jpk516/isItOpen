import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import VenueList from "../components/VenueList";
//import VenueService from '../services/venue-service';



function BRList(){
    return (
    <Container>
        <Row>
            <h2>Bars List</h2>
            <Col></Col>
                <Col lg={8}>
                    <VenueList />
                </Col>
                <Col></Col>
                <h2>Restaurant List</h2>
                <Col></Col>
                <Col lg={8}>
                    <VenueList />
                </Col>
                <Col></Col>
            </Row>

    </Container>

    
    );
}

export default BRList;