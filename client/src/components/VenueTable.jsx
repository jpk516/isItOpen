import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function VenueTable({ venues }) {
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'website', headerName: 'Website', width: 200 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 120 },
    { field: 'zip', headerName: 'ZIP Code', width: 130 },
  ];

  // Assuming 'venues' is an array of venue objects
  const rows = venues.map(venue => ({
    ...venue,
    id: venue._id,
    created: venue.created,
    modified: venue.modified,
  }));

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}

export default VenueTable;
