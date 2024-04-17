import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import VenueList from '../components/VenueList';
import ManageTags from '../components/ManageTags';
import { useState, useEffect } from 'react';
import VenueService from '../services/venue-service';
import VenueTable from '../components/VenueTable';
import AccountService from '../services/account-service';
import { useNavigate } from 'react-router-dom';
import ManageUsers from '../components/ManageUsers';
import { useAppContext } from '../contexts/AppContext';

function Admin() {
    const navigate = useNavigate();
    const { setPageTitle } = useAppContext();
    const [value, setValue] = useState('venues');
    const [venues, setVenues] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setPageTitle('Admininstration');
        
        VenueService.getAll().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error);
        });

        AccountService.getAll().then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleVenueClick = (params) => {
        navigate(`/venues/manage/${params.row.name}`);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="admin panel tabs" centered>
                                <Tab value="venues" label="Venues" />
                                <Tab value="tags" label="Tags" />
                                <Tab value="users" label="Users" />
                            </Tabs>
                        </Box>
                        {value === 'venues' && (
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <div>
                                        <Button variant="contained" component={NavLink} to="/venues/manage" sx={{margin: 2}}>
                                            Add Venue
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <VenueTable venues={venues} onVenueClick={handleVenueClick} />
                        </Box>
                        )}
                    {value === 'tags' && <ManageTags />}
                    {value === 'users' && <ManageUsers />}
                </Grid>
            </Grid>
        </>
    );
}

export default Admin;
