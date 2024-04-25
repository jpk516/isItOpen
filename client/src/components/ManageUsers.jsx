import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ConfirmModal from './ConfirmModal';
import UserTable from './UserTable';
import ManageUserDialog from './ManageUserDialog';
import AccountService from '../services/account-service';
import { useAppContext } from '../contexts/AppContext';



function ManageUsers() {
    const [users, setUsers] = useState([]);
    const defaultUser = { username: '', password: '', role: '', email: '', firstName: '', lastName: ''};
    const [currentUser, setCurrentUser] = useState(defaultUser);
    const [isEditing, setIsEditing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const {toggleSnackbar} = useAppContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        AccountService.getAll().then(response => {
            setUsers(response.data);
        }).catch(error => {
            toggleSnackbar('An error occured getting users', 'error');
        });
    };

    const handleSave = (editedUser) => {
        console.log(editedUser);
        AccountService.update(editedUser).then(response => {
            setCurrentUser(defaultUser);
            setIsEditing(false);
            setShowEditModal(false);
            fetchUsers();
        }).catch(error => {
            toggleSnackbar('An error occured updating user', 'error');
        });
        
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
            <UserTable users={users} onClick={handleEdit} />
            <ManageUserDialog user={currentUser} open={showEditModal} onClose={() => setShowEditModal(false)} onSave={(editedUser) => handleSave(editedUser)}  />
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
