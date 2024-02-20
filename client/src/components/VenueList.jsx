import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate } from "react-router-dom";

function VenueList() {
    const navigate = useNavigate();
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
            <Card.Header>Venue List</Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venues.map((venue, index) => {
                            return (
                                <tr key={index} className="pointer" onClick={() => handleRowClick(venue)}>
                                    <td>{venue.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default VenueList;