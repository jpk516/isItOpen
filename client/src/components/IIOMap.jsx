import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import mapStyles from '../styles/mapStyles'; //import style sheet for the map

function IIOMap() {
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
              <Marker position={{lat: 38.9506, lng: -92.3268}}></Marker>
              </Map>
        </APIProvider>
    );
  }
  
  export default IIOMap;
