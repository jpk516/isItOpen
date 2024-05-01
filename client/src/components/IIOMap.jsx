import React from 'react';
import {APIProvider, Map, Marker, MapControl, ControlPosition} from '@vis.gl/react-google-maps';
import IIOMarker from './IIOMarker';

function IIOMap({venues}) {

  return (
    <APIProvider apiKey="AIzaSyDBsAc39kykWMw9GcY0ReFazPl1DY4XRbg">
      <Map
        defaultCenter={{lat: 38.9517, lng: -92.3341}} //Set latitude and longitude to Columbia Missouri
        defaultZoom={14}
        style={{height: '600px' }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
		    mapId="7af4d03122461ee8"
      >
      {venues?.map((venue, index) => {
        return (
          <IIOMarker key={venue._id} venue={venue}/>
        )
      })}
      </Map>
    </APIProvider>
  );
}
  
export default IIOMap;