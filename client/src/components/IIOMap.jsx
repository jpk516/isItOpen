import React from 'react';
import { useState, useEffect } from 'react';
import {APIProvider, Map, Marker, MapControl, ControlPosition} from '@vis.gl/react-google-maps';
import VenueService from '../services/venue-service';
import { useNavigate } from "react-router-dom";
import IIOMarker from './IIOMarker';


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
		    mapId="7af4d03122461ee8"
      >
      {/* <Marker position={{lat: 38.9506, lng: -92.3268}}></Marker> */}
      {venues.map((venue, index) => {
        return (
   
          <IIOMarker key={venue._id} venue={venue} />
        )
      })}
      </Map>
    </APIProvider>
  );
}
  
export default IIOMap;