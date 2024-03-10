//Created new file to attempt creating list seperated by type
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate } from "react-router-dom";
// followed the original venue list for a good portion of the code just slight modification
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
// So I created a new function to filter the venues based on their type. This used alot of the original code from the venues List 
//first set the input to look for type of venue then set the filter for when it is accessed.
    const venuetype = (type) => {
        const filtervenue = venues.filter(venue => venue.type === type);
        // the above code is the filter
        return(
            // this is the format for which the list appear on the page.
            // The div statement encloses the content and gives it the key type for its filter to fort by
            <div key={type}>
                <Card>
                    <Card.Header>{type} List</Card.Header>
                    <Card.Body>
                        {/* This is the table that holds the content for the list we see on the page. */}
                        <Table striped bordered hover>
                            <tbody>
                                {/* This is where we apply the filter to the creation of the list allowing contious additions. */}
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
        // this is where we can set the types for the lists to display on the page.
        <div>
            {venuetype("Bar")}
            {venuetype("Restaurant")}
        </div>
    );
}

export default ListbyType;