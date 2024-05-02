import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx'; // Adjust the path as necessary
import { FaUserCircle } from 'react-icons/fa'; // Importing FontAwesome user circle icon
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { MdEmail } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '@mui/material/Button';
import { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm'; 

function ProfileCard() {
  const { auth } = useAppContext();
  const [showForm, setShowForm] = useState(false); 

  const handleShowForm = () => {
    setShowForm(!showForm); 
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card>
      <CardContent>
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <FaUserCircle />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {auth?.user.firstName || 'Guest'} {auth?.user.lastName || ''}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MdEmail />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  <strong>Email: </strong> {auth?.user.email || 'No email provided'}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaUserAstronaut />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  <strong>Username: </strong> {auth?.user.username || 'Loading...'}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BsCalendarDate />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  <strong>Account Created: </strong> {auth?.user.created ? formatDate(auth.user.created) : 'Loading...'}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RiLockPasswordFill />
            </ListItemIcon>
            <ListItemText
              primary={
                <Button variant="outlined" color="primary" onClick={handleShowForm}>
                  Change Password
                </Button>
              }
            />
          </ListItem>
          {showForm && <ChangePasswordForm onPasswordChange={handleShowForm} />}
        </List>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
