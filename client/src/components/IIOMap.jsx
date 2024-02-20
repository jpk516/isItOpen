import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function IIOMap() {
    return (
      <APIProvider apiKey="AIzaSyCPKB7QwX25zmCWHLt8InMcMsQ4B9_RCNQ">
              <Map
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                style={{height: '600px' }}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              />
        </APIProvider>
    );
  }
  
  export default IIOMap;

