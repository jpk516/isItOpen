import React from 'react';
import { useState, useEffect } from 'react';
import {APIProvider, Map, Marker, MapControl, ControlPosition} from '@vis.gl/react-google-maps';
//import mapStyles from '../styles/mapStyles'; //import style sheet for the map
import VenueService from '../services/venue-service';
import { useNavigate } from "react-router-dom";
import TestIIOMarker from './TestIIOMarker';


const icons = {
  bar: {
    icon: "https://img.icons8.com/plasticine/45/beer.png", // https://icons8.com/icons/set/map, Got these links to icons from this website
  },
  coffee: {
    icon: "https://img.icons8.com/color/45/coffee-to-go.png", //loads images for markers, same name as what the "type of place it is" to load markers based on business
  },
  restaurant: {
    icon: "https://img.icons8.com/matisse/45/restaurant.png",
  },
};

{/* <div class="info-window-content">
        <h3>${features[i].name}</h3>
        <p>Serves: ${features[i].type}</p>
        <p class="status-${features[i].isOpen ? 'open' : 'closed'}">  
          Status: ${features[i].isOpen ? 'Open' : 'Closed'}
        </p>
      </div> */}

function getIcon(type) {
  if (type === 'coffee') {
    return icons.coffee.icon;
  } else if (type === 'restaurant') {
    return icons.restaurant.icon;
  } else if (type === 'bar') {
    return icons.bar.icon;
  } else {
    return null;
  }
} 


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
          // <Marker 
          //   key={venue._id} 
          //   position={{lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0]}}
          //   title={venue.name}
          //   label={venue.type[0]}
          //   onClick={() => handleMarkerClick(venue)}
          // />
          <TestIIOMarker key={venue._id} venue={venue} />
        )
      })}
      </Map>
    </APIProvider>
  );
}
  
export default IIOMap;
