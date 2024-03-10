import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate } from "react-router-dom";

function ListbyType() {
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, []);

    function handleRowClick(venue) {
        navigate(`/venues/manage/${venue.name}`)
    }

    const venuetype = (type) => {
        const filtervenue = venues.filter(venue => venue.type === type);
        return(
            <div key={type}>
                <Card>
                    <Card.Header>{type} List</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Venue Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtervenue.map((venue, index) => (
                                    <tr key={index} className="pointer" onClick={() => handleRowClick(venue)}>
                                        <td>{venue.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );

    };
    return (
        <div>
            {venuetype("Bar")}
            {venuetype("Restaurant")}
        </div>
    );
}

export default ListbyType;