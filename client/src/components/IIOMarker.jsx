import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import CheckIfOpen from '../services/checkIfOpen';
import CheckInService from '../services/check-in-service'; 
import { useAppContext } from '../contexts/AppContext.jsx';


import {
  AdvancedMarker,
  Marker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from '@vis.gl/react-google-maps';
import { AppContext } from '../contexts/AppContext';

// Define the icons for each type of venue
const icons = {
  Bar: {
    icon: "https://img.icons8.com/plasticine/45/beer.png",
  },
  Coffee: {
    icon: "https://img.icons8.com/color/45/coffee-to-go.png",
  },
  Restaurant: {
    icon: "https://img.icons8.com/matisse/45/restaurant.png",
  },
  Music:
  {
    icon: "https://img.icons8.com/arcade/45/000000/music.png",
  },
  Other:
  {
    icon: "https://img.icons8.com/arcade/45/connection-status-off.png"
  }
};

function IIOMarker({venue}) {
  const navigate = useNavigate();
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [checkIns, setCheckIns] = useState([]);
  const {toggleSnackbar} = useAppContext();

  useEffect(() => {
    getCheckIns();
  }, [])

  const getCheckIns = (id) => {
    CheckInService.getByVenue(venue._id).then(response => {
        setCheckIns(response.data);
    }).catch(error => {
      toggleSnackbar('Error Getting Check In data', 'error');
    });
}


  // will go to public venue once that is checked in
  function handleVenueClick(name) {
    navigate(`/venues/${name}`)
  }

  const img = document.createElement('img');

  if(venue.type == "Music Venue")
  {
    img.src = icons.Music.icon; 
  }
  else
  {
    img.src = icons[venue.type]?.icon || '';
  }

  const isOpen = CheckIfOpen(venue, checkIns);

  //console.log(venue.name + "In IIOMarker is marked as " + isOpen);

  return (
    <>

      <AdvancedMarker 
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0] }}
        title={venue.name}
          // checks if the icon exists in the icons dictionary
      >
        <Pin glyph={img} background={'transparent'} borderColor={'transparent'} />
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
        <div className="info-window-content">
        <h3>{venue.name}</h3>
        <p>Serves: {venue.type}</p>
        <p className={`status-${isOpen ? 'open' : 'closed'}`}>Status: {isOpen ? 'Open' : 'Closed'}</p>
        <Button variant="contained" color="primary" onClick={() => handleVenueClick(venue.name)}>View</Button>
        </div>

        </InfoWindow>
    )}

    </>
  );
}

export default IIOMarker;
