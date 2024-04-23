import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FavoritesList from "../components/FavoritesList"
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import Title from './Title';
// import { useState, useEffect } from 'react';
// import VenueService from '../services/venue-service';
// import { useNavigate } from 'react-router-dom';
//{name}
function Fav() {
  // const navigate = useNavigate();
  //   const listName = name ? name : 'Favs';
  //   const [venues, setVenues] = useState([]);

  //   useEffect(() => {
  //       VenueService.getAll().then(response => {
  //           setVenues(response.data);
  //       }).catch(error => {
  //           console.log(error);
  //       });
  //   }, []);

    // function handleRowClick(venue) {
    //     navigate(`/venues/${venue.name}`);
    // }
  return(
    //style={{ height: 250, width: '100%' }
    // thought process is to add an icon or marker thats 
    //clickable to the rows so they start an event to add it to a favorites list
    //they feed the list into another grid table on the fav page

    < FavoritesList />
//   <div>
//     <DataGrid
//       columns={[{ field: 'name' }]}
//       rows={[
//         { id: 1, name: 'dummy', website:'website', status: "Open or not"},
//         { id: 2, name: 'info', website:'website', status: "Open or not"},
//     ]}
//   />
// </div>
   );
}
export default Fav;