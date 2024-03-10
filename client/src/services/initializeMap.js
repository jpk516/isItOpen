//https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker Got most of my info from here 

import initCustomMarkers from '../services/customMarkers.js';

let googleMapsScriptPromise = null;

function loadGoogleMapsScript() {
  if (window.google && window.google.maps) {
    // if google maps is alreadt loaded, we return that it is loaded and do not initilize anything again
    return Promise.resolve(window.google.maps);
  }

  if (!googleMapsScriptPromise) {
    // load the promise script which can be changed later
    googleMapsScriptPromise = new Promise((resolve, reject) => {
      // Check if the script tag already exists
      const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      
      if (existingScript) {
        // If the script is already on the page, check if the Google Maps API has been initialize
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
        } 
        else {
           // If the script tag is there but the API hasn't loaded yet, attach event listeners
          existingScript.addEventListener('load', () => resolve(window.google.maps));
          existingScript.addEventListener('error', reject);
        }
      } 
      else {
        // If no script tag exists, create a new one
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDBsAc39kykWMw9GcY0ReFazPl1DY4XRbg&callback=resolveGoogleMapsScript`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script); //adds new script to head

        window.resolveGoogleMapsScript = () => {
          resolve(window.google.maps); //resolves the the promise globally
        };

        script.addEventListener('error', reject); //if there is an error, reject the promise
      }
    });
  }

  return googleMapsScriptPromise;
}

export async function initMap(mapElement) {
  try {
    await loadGoogleMapsScript(); //calls load googleMapsScript function

    const map = new window.google.maps.Map(mapElement, { //initilizes map over Columbia and with map ID
      center: { lat: 38.9517, lng: -92.3341},
      zoom: 15,
      mapId: "7af4d03122461ee8",
    });

    await initCustomMarkers(map); //calls the customMarkers function 

   

    return { map }; // Return the map 
  } catch (error) {
    console.error("Failed to load the Google Maps script:", error); //error message if map fails to intilize
  }
}