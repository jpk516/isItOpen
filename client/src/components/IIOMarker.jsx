import React, { useState } from 'react';
import {
  AdvancedMarker,
  Marker,
  InfoWindow,
  useAdvancedMarkerRef
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
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>

      <Marker //using Marker, to use advanced marker you just do <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0] }}
        title={venue.name}
        icon={icons[venue.type]?.icon || ''}  // checks if the icon exists in the icons dictionary
      />
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
        </div>

        </InfoWindow>
    )}

    </>
  );
}

export default IIOMarker;
