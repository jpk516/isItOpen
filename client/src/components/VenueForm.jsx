import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import VenueService from '../services/venue-service';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppContext } from '../contexts/AppContext';

function VenueForm() {
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {toggleSnackBar} = useAppContext();
    const { name } = useParams();
    const navigate = useNavigate();
    const [venueDetails, setVenueDetails] = useState({
        name: '', 
        description: '', 
        address: '', 
        city: '', 
        state: '', 
        zip: '', 
        phone: '', 
        email: '', 
        website: '', 
        image: '', 
        type: ''
    });

    useEffect(() => {
        if (name && name.length > 0) {
            VenueService.get(name).then(response => {
                setVenueDetails(response.data);
            }).catch(error => {
                toggleSnackbar('An error occured, Venue cannot be found', 'error');
            });
        }
    }, [name, VenueService]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const serviceMethod = venueDetails._id ? VenueService.update : VenueService.add;
            serviceMethod(venueDetails)
                .then(response => {
                    setVenueDetails(response.data);
                    //navigate("/venues");
                })
                .catch(error => {
                    toggleSnackbar('An error occured please try again', 'error');
                });
        }
    };

    return (
        <Card>
            <CardContent>
                <Box
                    component="form"
                    noValidate
                    validated={validated.toString()}
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Venue Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={venueDetails.name}
                                onChange={e => setVenueDetails({ ...venueDetails, name: e.target.value })}
                                disabled={!!venueDetails._id}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    value={venueDetails.type}
                                    label="Type"
                                    onChange={e => setVenueDetails({ ...venueDetails, type: e.target.value })}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Bar">Bar</MenuItem>
                                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                                    <MenuItem value="Music Venue">Music Venue</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={venueDetails.email}
                                onChange={e => setVenueDetails({ ...venueDetails, email: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="website"
                                label="Website"
                                name="website"
                                autoComplete="website"
                                value={venueDetails.website}
                                onChange={e => setVenueDetails({ ...venueDetails, website: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={venueDetails.description}
                                onChange={e => setVenueDetails({ ...venueDetails, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                value={venueDetails.address}
                                onChange={e => setVenueDetails({ ...venueDetails, address: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                value={venueDetails.city}
                                onChange={e => setVenueDetails({ ...venueDetails, city: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                autoComplete="state"
                                value={venueDetails.state}
                                onChange={e => setVenueDetails({ ...venueDetails, state: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="zip"
                                label="Zip Code"
                                name="zip"
                                autoComplete="zip"
                                value={venueDetails.zip}
                                onChange={e => setVenueDetails({ ...venueDetails, zip: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                autoComplete="phone"
                                value={venueDetails.phone}
                                onChange={e => setVenueDetails({ ...venueDetails, phone: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className='text-end'>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={(evt) => handleSubmit(evt)}>
                                Save Venue
                            </Button>
                        </Grid>
                    </Grid>
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export default VenueForm;
