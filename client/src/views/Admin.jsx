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
import { useState } from 'react';

function Admin() {
    const [value, setValue] = useState('venues');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="admin panel tabs" centered>
                                <Tab value="venues" label="Venues" />
                                <Tab value="tags" label="Tags" />
                                <Tab value="users" label="Users" />
                            </Tabs>
                        </Box>
                        {value === 'venues' && (
                        <Box>
                            <Grid container spacing={2} className="mb-3">
                                <Grid item xs={12} md={12}>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <Button variant="contained" component={NavLink} to="/venues/manage">
                                            Add Venue
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <VenueList />
                        </Box>
                        )}
                        {value === 'tags' && <ManageTags />}
                        {value === 'users' && <p>Users form will be here</p>}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Admin;
