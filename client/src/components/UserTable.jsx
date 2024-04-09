import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UserTable = ({ users, onClick }) => {

    const handleRowClick = (data) => {
        if (onClick) {
            onClick(data.row);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'username', headerName: 'Username', width: 150 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
            editable: false,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            editable: false,
        },
        {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: false,
        },
        {
        field: 'role',
        headerName: 'Role',
        width: 110,
        editable: false,
        }
    ];

    // Adding an id property if not present
    const rows = users.map((user) => ({
        id: user._id || user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        username: user.username,
        created: user.created ? new Date(user.created).toLocaleString() : '',
    }));

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(data) => handleRowClick(data)}
      />
    </div>
  );
};

export default UserTable;
