import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import IIOMap from '../components/IIOMap';
import VenueList from '../components/VenueList';
import VenueService from '../services/venue-service';
import CheckInService from '../services/check-in-service';
import CheckInList from '../components/CheckInList';
import { useState, useEffect } from 'react';

function Home() {
    const [venues, setVenues] = useState([]);
    const [checkIns, setCheckIns] = useState([]);
    
    useEffect(() => {
        getVenues();
        getCheckIns();
    }, [])

    const getVenues = () => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    const getCheckIns = () => {
        CheckInService.getRecent(10).then(response => {
            setCheckIns(response.data);
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>What's Open?</h2>
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

            <Row className="mt-3 mb-3">
                <Col>
                    <h2>What's Hot?</h2>
                </Col>
                <hr />
            </Row>
            <Row className="check-in-container">
                <Col>
                    <CheckInList checkIns={checkIns} />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;