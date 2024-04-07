import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ConfirmModal from './ConfirmModal';
import TagService from '../services/tag-service';

function ManageTags() {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    TagService.getAll().then(response => {
      setTags(response.data);
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
    setCurrentTag({ name: '' });
    setIsEditing(false);
    fetchTags();
  };

  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setIsEditing(true);
  };

  const showDeleteConfirmation = (id) => {
    setIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!idToDelete) return;
    await TagService.delete(idToDelete);
    fetchTags();
    setShowConfirmModal(false);
  };

  return (
    <>
      <Card>
        <CardHeader title={isEditing ? 'Edit Tag' : 'Add Tag'} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Enter tag text"
                value={currentTag.name}
                onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {isEditing ? 'Save Changes' : 'Add Tag'}
              </Button>
            </Grid>
          </Grid>
          <List className="mt-3">
            {tags.map(tag => (
              <ListItem key={tag._id} secondaryAction={
                <>
                  <Button variant="contained" color="info" onClick={() => handleEdit(tag)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => showDeleteConfirmation(tag._id)} sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </>
              }>
                <ListItemText primary={tag.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        body="Are you sure you want to delete this tag?"
      />
    </>
  );
}

export default ManageTags;
