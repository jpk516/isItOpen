import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

function IIOMarker({venue}) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat: venue.geo.coordinates[1], lng: venue.geo.coordinates[0]}}
        title={venue.name}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          This is an example for the{' '}
          <code style={{whiteSpace: 'nowrap'}}>&lt;AdvancedMarker /&gt;</code>{' '}
          combined with an Infowindow.
        </InfoWindow>
      )}
    </>
  );
};

export default IIOMarker;