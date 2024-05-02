import React from 'react';
import moment from 'moment-timezone';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const VenueHours = ({ hours }) => {
  const convertToCST = (utcTime) => {
    if (!utcTime) {
      return 'Closed';
    }
    return moment.utc(utcTime).format('h:mm A');
  };

  return (
    <Card>
      <CardHeader title="Google-Listed Hours" />
      <CardContent>
        <List>
          {hours.map((hourEntry, index) => (
            <ListItem key={hourEntry._id || index}>
              <ListItemText 
                primary={
                  <Typography variant="body1">
                    <strong>{hourEntry.day}:</strong> {convertToCST(hourEntry.open)} - {convertToCST(hourEntry.close)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default VenueHours;

