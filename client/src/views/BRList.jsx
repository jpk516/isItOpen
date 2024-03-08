import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import VenueList from "../components/VenueList";



function BRList(){
    return ("hello BRList",
    <Container>
        <Row>
            <h2>Bars List</h2>
            <Col></Col>
                <Col lg="8">
                    <VenueList />
                </Col>
                <Col></Col>
                <h2>Restaurant List</h2>
                <Col className='d-flex justify-content-center align-items-center'>
                    <VenueList />
                </Col>
            </Row>

    </Container>

    
    );
}

export default BRList;