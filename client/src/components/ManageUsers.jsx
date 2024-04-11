import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountService from '../services/account-service';
import ConfirmModal from './ConfirmModal';
import UserTable from './UserTable';
import ManageUserDialog from './ManageUserDialog';


function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({ username: '', password: '', role: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        AccountService.getAll().then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const handleSave = async () => {
        if (isEditing) {
            await TagService.update(currentTag);
        } else {
            await TagService.add(currentTag);
        }
        setUsers({ username: '', password: '', role: '' });
        setIsEditing(false);
        fetchUsers();
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setShowEditModal(true);
    };

    const showDeleteConfirmation = (id) => {
        setIdToDelete(id);
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        if (!idToDelete) return;
        await AccountService.delete(idToDelete);
        fetchUsers();
        setShowConfirmModal(false);
    };

  return (
    <>
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <div>
                        {/* <Button variant="contained" component={NavLink} to="/venues/manage" sx={{margin: 2}}>
                            Add User
                        </Button> */}
                    </div>
                </Grid>
            </Grid>
            <UserTable users={users} onClick={handleEdit} />
            <ManageUserDialog user={currentUser} open={showEditModal} onClose={() => setShowEditModal(false)}  />
        </Box>

        <ConfirmModal
            show={showConfirmModal}
            onHide={() => setShowConfirmModal(false)}
            onConfirm={handleDelete}
            title="Confirm Delete"
            body="Are you sure you want to delete this user? THIS CANNOT BE UNDONE!"
        />
    </>
  );
}

export default ManageUsers;
