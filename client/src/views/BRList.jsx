import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
//import VenueList from "../components/VenueList";
import ListbyType from "../components/Listbytype";
//import VenueService from '../services/venue-service';

import { useAppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';



function BRList(){

    const { setPageTitle, toggleSnackbar } = useAppContext();

    useEffect(() => {
        setPageTitle('BRList');
    }, [])

    return (
    <Container>
        <Row>
            <h1>Venue Lists</h1>
            <Col></Col>
                <Col lg={8}>
                    <ListbyType />
                </Col>
                <Col></Col>
            </Row>

    </Container>

    
    );
}

export default BRList;