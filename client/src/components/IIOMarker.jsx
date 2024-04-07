import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

import {
  AdvancedMarker,
  Marker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from '@vis.gl/react-google-maps';

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
};

function IIOMarker({ venue }) {
  const navigate = useNavigate();
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // will go to public venue once that is checked in
  function handleVenueClick(name) {
    navigate(`/venues/${name}`)
  }

  const img = document.createElement('img');
  img.src = icons[venue.type]?.icon || '';

  return (
    <>

      <AdvancedMarker //using Marker, to use advanced marker you just do <AdvancedMarker
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
        <p className="status-open">Status: Open</p>
        <Button variant="contained" color="primary" onClick={() => handleVenueClick(venue.name)}>View</Button>
        </div>

        </InfoWindow>
    )}

    </>
  );
}

export default IIOMarker;
