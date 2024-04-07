import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Title from './Title';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import { useNavigate } from 'react-router-dom';

function VenueList({ name }) {
    const navigate = useNavigate();
    const listName = name ? name : 'Venues';
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function handleRowClick(venue) {
        navigate(`/venues/${venue.name}`);
    }

    return (
        <>
        <Title>What's Open?</Title>
        <List>
            {venues.map((venue, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => handleRowClick(venue)}>
                        {venue.name}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        </>
    );
}

export default VenueList;
