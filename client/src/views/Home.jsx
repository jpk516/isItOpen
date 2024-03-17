import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import IIOMap from '../components/IIOMap';
import VenueList from '../components/VenueList';
import VenueService from '../services/venue-service';
import { useState, useEffect } from 'react';

function Home() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>What's Hot?</h2>
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <IIOMap venues={venues} />
                </Col>
                <Col lg={4}>
                    <VenueList />
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Home;