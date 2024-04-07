import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

function VenueTable({ venues, onVenueClick }) {
  const navigate = useNavigate();

  const handleButtonClick = (params) => {
    if (onVenueClick) {
      onVenueClick(params);
    } else {
      navigate(`/venues/${params.row.name}`);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200, 
      renderCell: (params) => (
        <a href={`mailto:${params.value}`}>{params.value}</a>
      )
    },
    { 
      field: 'website', 
      headerName: 'Website', 
      width: 200, 
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>
      )
    },
    { 
      field: 'address', 
      headerName: 'Address', 
      width: 300, 
      renderCell: (params) => (
        <>
          {`${params.row.address}, ${params.row.city}, ${params.row.state}, ${params.row.zip}`}
        </>
      )
    },
    { field: 'type', headerName: 'Type', width: 130 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 130,
      renderCell: (params) => (
        <button onClick={() => handleButtonClick(params)}>Click Me</button>
      )
    },
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
        rowsPerPageOptions={[10, 20, 50]}
        columnVisibilityModel={{
          email: false,
          phone: false,
      }}
      />
    </div>
  );
}

export default VenueTable;
