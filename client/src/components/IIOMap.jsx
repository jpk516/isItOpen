import React, { useEffect, useRef } from 'react';
import { initMap } from '../services/initializeMap';

const IIOMap = () => {

  //*Useref is a mutable ref, so until map is loaded in the other file we set this to null to not cause any erros 
  const mapRef = useRef(null); 

  useEffect(() => {
    //after component mounts, map begins to initilize
    if (mapRef.current) { //making sure mapref is has a DOM element
      
      //calls the initMap function in intilizeMap.js file
      initMap(mapRef.current).then(({ map, marker}) => {
      }).catch(error => console.error(error)); //error initilizing error is thrown
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: '100%' }}></div>; //have to return a div for the map, as it does not automatically do it like api Provider does
};

export default IIOMap;
