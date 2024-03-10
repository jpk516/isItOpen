async function initCustomMarkers(map) {
    
    
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
    
    const features = [ //initilizes information for the markers, like where they will be placed at, information about them

        {
            position: new google.maps.LatLng(38.9506, -92.3268),
            type: "bar",
            name: "Harpos Bar and Grill",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.9517, -92.3249),  //https://developers.google.com/maps/documentation/javascript/custom-markers Most of the page I got and modifies from the website right here
            type: "bar",
            name: "Willies",
            isOpen: false,
        },
        {
            position: new google.maps.LatLng(38.9512, -92.3280),
            type: "bar",
            name: "Broadway Brewery",
            isOpen: true,
        },

        {
            position: new google.maps.LatLng(38.94811589123557, -92.32743965674543),
            type: "coffee",
            name: "Starbucks",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.94841994700922, -92.32698746780956),
            type: "coffee",
            name: "Rise and Grind",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.95076787239808, -92.32717024327575),
            type: "coffee",
            name: "Lakota Coffee Company",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.94870117503093, -92.32782640789546),
            type: "restaurant",
            name: "Shakespeares Pizza",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.95015802441074, -92.3320720365706),
            type: "restaurant",
            name: "Flat Branch Brewery",
            isOpen: true,
        },
        {
            position: new google.maps.LatLng(38.951429576718276, -92.33106130710668),
            type: "restaurant",
            name: "El Oso Mexican Grill",
            isOpen: true,
        },
      
    ];
  
    // Loops through features array, then creates all the markers
    for (let i = 0; i < features.length; i++) {
      
      //Creates an image, and loads the image based on the type of marker
      const iconImage = document.createElement("img");
      iconImage.src = icons[features[i].type].icon;
      
      
      // Use AdvancedMarkerElement to create a custom marker
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: features[i].position,
        content: iconImage, //loads map, position and content of the image
      });


      ////https://developers.google.com/maps/documentation/javascript/infowindows  \
      //Got a lot of my infortmation from the link above, uses info in the features to fill out info for the content, then just basic html
      const infoWindowContent = `
      <div class="info-window-content">
        <h3>${features[i].name}</h3>
        <p>Serves: ${features[i].type}</p>
        <p class="status-${features[i].isOpen ? 'open' : 'closed'}">  
          Status: ${features[i].isOpen ? 'Open' : 'Closed'}
        </p>
      </div>
    `;


    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });  //intilizes the content above into the info window associated with this marker
  
    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    }); //intilizes the marker to listen, so when uses clicks it, the info window event is triggered


    }
  }
  
  export default initCustomMarkers
  
  