import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState, useEffect } from 'react';
import CheckInService from '../services/check-in-service';
import { useNavigate } from "react-router-dom";
import VenueService from '../services/venue-service';
import TagService from '../services/tag-service';


function CheckIn({onCheckIn}) {
    const navigate = useNavigate();
    const defaultObject = { open: true, comment: '', venue: '', tags: [] };
    const [errorMessage, setErrorMessage] = useState('');
    const [checkInDetails, setCheckInDetails] = useState(defaultObject);
    const [venueSelectList, setVenueSelectList] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        VenueService.getSelectList().then(response => {
            setVenueSelectList(response.data);
        }).catch(error => {
            console.log(error)
        })
        
        TagService.getAll().then(response => {
            setTags(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleTagClick = (tag) => {
        let updatedTags;
        if (checkInDetails?.tags?.includes(tag.name)) {
            updatedTags = checkInDetails.tags.filter((clickedTag) => clickedTag !== tag.name);
        } else {
            updatedTags = [...checkInDetails.tags, tag.name];
        }
        setCheckInDetails({ ...checkInDetails, tags: updatedTags });
    };

    const handleCheckIn = () => {
        CheckInService.add(checkInDetails)
            .then(response => {
                setCheckInDetails(defaultObject);
            })
            .catch(error => {
                setErrorMessage(error.response?.data ?? "An error occurred, please try again.")
            })
    }

    const handleOpenChange = (isOpen) => {
        setCheckInDetails({ ...checkInDetails, open: isOpen });
    }

    const handleTagsChange = (tags) => {
        setCheckInDetails({ ...checkInDetails, tags });
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="pb-3">What's Up? Are they still serving?</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="formIsOpen">
                        <ButtonGroup>
                            <Button variant={checkInDetails.open ? "success" : "outline-secondary"} onClick={() => handleOpenChange(true)}>Yup! It's open.</Button>
                            <Button variant={!checkInDetails.open ? "danger" : "outline-secondary"} onClick={() => handleOpenChange(false)}>Nope! They are done.</Button>
                        </ButtonGroup>
                    </Form.Group>
                    
                    { checkInDetails.open && 
                        <Form.Group className="mb-3">
                            <Form.Label>What's It Like?</Form.Label>
                            <Stack direction="horizontal" gap={2} className='mt-2 mb-4'>
                            {tags.map((tag) => (
                                <h5 key={tag._id}>
                                    <Badge
                                        id={tag._id}
                                        bg={checkInDetails?.tags?.includes(tag.name) ? "success" : "secondary"}
                                        onClick={() => handleTagClick(tag)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {tag.name}
                                    </Badge>
                                </h5>
                            ))}
                            </Stack>
                        </Form.Group>
                    }

                    <Form.Group className="mb-3">
                        <Form.Label>Any other juicy details?</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Something something something" value={checkInDetails.comment} onChange={(e) => setCheckInDetails({ ...checkInDetails, comment: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formVenue">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control as="select" value={checkInDetails.venue} onChange={(e) => setCheckInDetails({ ...checkInDetails, venue: e.target.value })}>
                            <option value="">Select venue</option>
                            {venueSelectList.map((venue) => (
                                <option key={venue._id} value={venue._id}>{venue.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={handleCheckIn}>
                            Check In
                        </Button>
                    </div>
                    
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CheckIn;
