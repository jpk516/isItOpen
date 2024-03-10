import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate, useParams } from "react-router-dom";

function VenueList({name}) {
    const navigate = useNavigate();
    const listName = name ? name : "Venues";
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handleRowClick(venue) {
        navigate(`/venues/manage/${venue.name}`)
    }

    return (
        <Card>
            <Card.Header>{listName}</Card.Header>
            <ListGroup variant='flush'>
                {venues.map((venue, index) => {
                    return (
                        <ListGroup.Item key={index} action onClick={() => handleRowClick(venue)}>
                            {venue.name}
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
        </Card>
    );
}

export default VenueList;