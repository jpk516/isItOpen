import React from 'react';
import { useState, useEffect } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import mapStyles from '../styles/mapStyles'; //import style sheet for the map
import VenueService from '../services/venue-service';

function IIOMap() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
      VenueService.getAll().then(response => {
          setVenues(response.data);
      }).catch(error => {
          console.log(error)
      })
  }, [])

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
            {/* <Marker position={{lat: 38.9506, lng: -92.3268}}></Marker> */}
            {venues.map((venue, index) => {
              return (
                <Marker key={venue._id} position={{lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0]}}></Marker>
              )
            })}
            </Map>
      </APIProvider>
  );
}
  
export default IIOMap;
