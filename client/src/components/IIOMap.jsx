import React from 'react';
import { useState, useEffect } from 'react';
import {APIProvider, Map, Marker, MapControl, ControlPosition} from '@vis.gl/react-google-maps';
import mapStyles from '../styles/mapStyles'; //import style sheet for the map
import VenueService from '../services/venue-service';
import IIOMarker from './IIOMarker';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function IIOMap() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
      VenueService.getAll().then(response => {
          setVenues(response.data);
      }).catch(error => {
          console.log(error)
      })
  }, [])

  function handleMarkerClick(venue) {
    navigate(`/venues/manage/${venue.name}`)
  }

  return (
    <APIProvider apiKey="AIzaSyDBsAc39kykWMw9GcY0ReFazPl1DY4XRbg">
            <Map
              defaultCenter={{lat: 38.9517, lng: -92.3341}} //Set latitude and longitude to Columbia Missouri
              defaultZoom={15}
              style={{height: '600px' }}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              options={{styles:mapStyles}} //add styling to the map from the mapStyles.js file
            >
              <MapControl position={ControlPosition.TOP_LEFT} variant="secondary">
                <Card>
                  <Card.Body>Is It Open?</Card.Body>
                </Card>
              </MapControl>
            {/* <Marker position={{lat: 38.9506, lng: -92.3268}}></Marker> */}
            {venues.map((venue, index) => {
              return (
                <Marker 
                  key={venue._id} 
                  position={{lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0]}}
                  title={venue.name}
                  label={venue.type[0]}
                  onClick={() => handleMarkerClick(venue)}
                />
              )
            })}
            </Map>
      </APIProvider>
  );
}
  
export default IIOMap;
