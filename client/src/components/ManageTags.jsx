import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import TagService from '../services/tag-service';
import ConfirmModal from './ConfirmModal';

function ManageTags() {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState({name: ''});
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
          console.log(error)
      })
  };

  const handleSave = async () => {
      if (isEditing) {
          await TagService.update(currentTag);
      } else {
          await TagService.add(currentTag);
      }
      setCurrentTag({name: ''});
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
        <Card.Header>{isEditing ? 'Edit Tag' : 'Add Tag'}</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group controlId="formTagName">
                  <Form.Control
                    type="text"
                    placeholder="Enter tag text"
                    value={currentTag.name}
                    onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button variant="primary" onClick={handleSave}>
                  {isEditing ? 'Save Changes' : 'Add Tag'}
                </Button>
              </Col>
            </Row>
          </Form>
          <ListGroup className="mt-3">
            {tags.map(tag => (
              <ListGroup.Item key={tag._id}>
                {tag.name}
                <Button variant="info" size="sm" onClick={() => handleEdit(tag)} className="ms-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => showDeleteConfirmation(tag._id)} className="ms-2">
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
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
